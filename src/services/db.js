// Client-Side Mock Database Manager with LocalStorage Persistence
// Ready to switch to Firebase Firestore/Auth/Storage once credentials are provided.

const STORAGE_KEYS = {
  USERS: 'antariksa_users',
  REIMBURSEMENTS: 'antariksa_reimbursements',
  GALLERY: 'antariksa_gallery',
  DONATIONS: 'antariksa_donations',
  BOM_SHEETS: 'antariksa_bom_sheets',
  INVENTORY: 'antariksa_inventory',
  PRESENTER_MEDIA: 'antariksa_presenter_media',
  CURRENT_USER: 'antariksa_current_user',
  EMAIL_LOGS: 'antariksa_email_logs'
};

// Initial Seed Data
const SEED_USERS = [
  { email: 'admin@antariksa.org', password: 'admin123', role: 'super-admin', name: 'Super Admin' },
  { email: 'volunteer@antariksa.org', password: 'volunteer123', role: 'volunteer', name: 'John Volunteer' },
  { email: 'presenter@antariksa.org', password: 'presenter123', role: 'presenter', name: 'Prof. Presenter' }
];

const SEED_GALLERY = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=1200', title: 'Rocket Launch', desc: 'Solid propulsion model rocket ignition.', aspectRatio: '3:2' },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=1200', title: 'Deep Space Observation', desc: 'Viewing deep nebula structures.', aspectRatio: '4:3' },
  { id: 'g3', url: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1200', title: 'Astronomy Workshop', desc: 'Students adjusting dobsonian telescopes.', aspectRatio: '1:1' },
  { id: 'g4', url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200', title: 'CanSat Assembly', desc: 'Students mounting sensors on the chassis.', aspectRatio: '2:3' }
];

const SEED_BOM = [
  {
    id: 'bom-r1',
    name: 'Model Rocket Propulsion Kit',
    division: 'rocket',
    lastEditedBy: 'admin@antariksa.org',
    lastEditedAt: new Date(Date.now() - 3600000).toISOString(),
    rows: [
      { id: 'r1', item: 'Estes C6-5 Rocket Engines', quantity: 24, unitPrice: 12.50, bought: true, boughtDate: '2026-07-10 14:32' },
      { id: 'r2', item: 'Altimeter Micro-Sensor Boards', quantity: 10, unitPrice: 45.00, bought: false, boughtDate: '' },
      { id: 'r3', item: 'Nylon Parachutes 18-inch', quantity: 15, unitPrice: 8.90, bought: true, boughtDate: '2026-07-11 09:15' },
      { id: 'r4', item: 'Cardboard Body Tubes', quantity: 30, unitPrice: 3.20, bought: false, boughtDate: '' }
    ]
  },
  {
    id: 'bom-c1',
    name: 'CanSat Telemetry Kit V2',
    division: 'cansat',
    lastEditedBy: 'admin@antariksa.org',
    lastEditedAt: new Date(Date.now() - 7200000).toISOString(),
    rows: [
      { id: 'c1', item: 'Arduino Nano Boards', quantity: 12, unitPrice: 9.99, bought: true, boughtDate: '2026-07-09 11:20' },
      { id: 'c2', item: 'BMP280 Barometric Pressure Sensors', quantity: 12, unitPrice: 4.50, bought: true, boughtDate: '2026-07-09 11:20' },
      { id: 'c3', item: 'APC220 Wireless RF Modules', quantity: 6, unitPrice: 38.00, bought: false, boughtDate: '' },
      { id: 'c4', item: 'LiPo Battery Pack 3.7V', quantity: 15, unitPrice: 12.00, bought: false, boughtDate: '' }
    ]
  }
];

const SEED_INVENTORY = [
  { id: 'inv1', itemName: 'Estes solid propellant packs', division: 'rocket', quantity: 48, status: 'In Stock', lastEditedBy: 'admin@antariksa.org', lastEditedAt: new Date().toISOString() },
  { id: 'inv2', itemName: 'Arduino Nano Microcontrollers', division: 'satellite', quantity: 15, status: 'Low Stock', lastEditedBy: 'admin@antariksa.org', lastEditedAt: new Date().toISOString() },
  { id: 'inv3', itemName: 'GPS Antennas 5V', division: 'satellite', quantity: 8, status: 'Low Stock', lastEditedBy: 'admin@antariksa.org', lastEditedAt: new Date().toISOString() },
  { id: 'inv4', itemName: 'Body Tubes 40mm', division: 'rocket', quantity: 120, status: 'In Stock', lastEditedBy: 'admin@antariksa.org', lastEditedAt: new Date().toISOString() }
];

const SEED_REIMBURSEMENTS = [
  { id: 'rb1', volunteerEmail: 'volunteer@antariksa.org', volunteerName: 'John Volunteer', amount: 84.50, reason: 'Bought rocket body tubes for classroom demo', receiptUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=200', bankDetails: 'Chase Bank, Acc: 123456789, Routine: 987654321, Name: John Volunteer', status: 'Approved', createdAt: '2026-07-08T10:00:00.000Z', txId: 'TXN-938204820', approvedAt: '2026-07-08T14:30:00.000Z' },
  { id: 'rb2', volunteerEmail: 'volunteer@antariksa.org', volunteerName: 'John Volunteer', amount: 150.00, reason: 'Barometric sensor chips procurement for CanSat class', receiptUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=200', bankDetails: 'Chase Bank, Acc: 123456789, Routine: 987654321, Name: John Volunteer', status: 'Pending', createdAt: '2026-07-11T12:00:00.000Z' }
];

const SEED_PRESENTER_MEDIA = [
  { id: 'pm1', url: 'https://images.unsplash.com/photo-1454789548928-9efd52dc4031?q=80&w=400', type: 'image', title: 'Atmospheric Layers Diagram', associatedCourse: 'CanSat Telemetry', lastEditedBy: 'presenter@antariksa.org', lastEditedAt: new Date().toISOString() },
  { id: 'pm2', url: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'video', title: 'Model Rocket Burn Stage Demo', associatedCourse: 'Model Rocketry 101', lastEditedBy: 'presenter@antariksa.org', lastEditedAt: new Date().toISOString() }
];

// Helper to initialize LocalStorage if empty
const initLocalStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(SEED_USERS));
  if (!localStorage.getItem(STORAGE_KEYS.GALLERY)) localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(SEED_GALLERY));
  if (!localStorage.getItem(STORAGE_KEYS.BOM_SHEETS)) localStorage.setItem(STORAGE_KEYS.BOM_SHEETS, JSON.stringify(SEED_BOM));
  if (!localStorage.getItem(STORAGE_KEYS.INVENTORY)) localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(SEED_INVENTORY));
  if (!localStorage.getItem(STORAGE_KEYS.REIMBURSEMENTS)) localStorage.setItem(STORAGE_KEYS.REIMBURSEMENTS, JSON.stringify(SEED_REIMBURSEMENTS));
  if (!localStorage.getItem(STORAGE_KEYS.PRESENTER_MEDIA)) localStorage.setItem(STORAGE_KEYS.PRESENTER_MEDIA, JSON.stringify(SEED_PRESENTER_MEDIA));
  if (!localStorage.getItem(STORAGE_KEYS.DONATIONS)) localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify([]));
  if (!localStorage.getItem(STORAGE_KEYS.EMAIL_LOGS)) localStorage.setItem(STORAGE_KEYS.EMAIL_LOGS, JSON.stringify([]));
};

initLocalStorage();

// Database Service Interface
export const db = {
  // --- AUTH SERVICES ---
  login(email, password) {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS));
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (user) {
      const sessionUser = { email: user.email, role: user.role, name: user.name };
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(sessionUser));
      return { success: true, user: sessionUser };
    }
    return { success: false, error: 'Invalid email or password' };
  },

  getCurrentUser() {
    const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  // --- REIMBURSEMENT SERVICES ---
  getReimbursements() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.REIMBURSEMENTS));
  },

  addReimbursement(amount, reason, receiptUrl, bankDetails) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return { success: false, error: 'Not authenticated' };

    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.REIMBURSEMENTS));
    const newReq = {
      id: 'rb-' + Math.random().toString(36).substr(2, 9),
      volunteerEmail: currentUser.email,
      volunteerName: currentUser.name,
      amount: parseFloat(amount),
      reason,
      receiptUrl,
      bankDetails,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    list.push(newReq);
    localStorage.setItem(STORAGE_KEYS.REIMBURSEMENTS, JSON.stringify(list));
    return { success: true, request: newReq };
  },

  updateReimbursementStatus(id, status, txId = '') {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.REIMBURSEMENTS));
    const reqIndex = list.findIndex(r => r.id === id);
    if (reqIndex === -1) return { success: false, error: 'Request not found' };

    list[reqIndex].status = status;
    if (status === 'Approved') {
      list[reqIndex].txId = txId || 'TXN-' + Math.floor(100000000 + Math.random() * 900000000);
      list[reqIndex].approvedAt = new Date().toISOString();

      // Automate email notification simulation when approved and transaction is initiated
      const emailLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.EMAIL_LOGS)) || [];
      const emailContent = {
        id: 'mail-' + Math.random().toString(36).substr(2, 9),
        to: list[reqIndex].volunteerEmail,
        subject: `Payment Initiated: Reimbursement Request Approved`,
        body: `Hi ${list[reqIndex].volunteerName},\n\nWe are pleased to inform you that your reimbursement request of $${list[reqIndex].amount} for "${list[reqIndex].reason}" has been APPROVED.\n\nThe payment has been initiated and transferred to your bank account details:\n${list[reqIndex].bankDetails}.\n\nTransaction ID: ${list[reqIndex].txId}\nDate: ${new Date().toLocaleString()}\n\nRegards,\nAntariksa Foundation Finance Dept.`,
        sentAt: new Date().toISOString()
      };
      emailLogs.push(emailContent);
      localStorage.setItem(STORAGE_KEYS.EMAIL_LOGS, JSON.stringify(emailLogs));
    }
    localStorage.setItem(STORAGE_KEYS.REIMBURSEMENTS, JSON.stringify(list));
    return { success: true };
  },

  // --- GALLERY SERVICES ---
  getGallery() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.GALLERY));
  },

  addGalleryItem(url, title, desc, aspectRatio = '3:2') {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.GALLERY));
    const newItem = {
      id: 'g-' + Math.random().toString(36).substr(2, 9),
      url,
      title,
      desc,
      aspectRatio
    };
    list.push(newItem);
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(list));
    return { success: true, item: newItem };
  },

  deleteGalleryItem(id) {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.GALLERY));
    const filtered = list.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(filtered));
    return { success: true };
  },

  // --- DONATION INTAKE SERVICES ---
  getDonations() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.DONATIONS));
  },

  addDonationLead(donorName, donorEmail, amount, type, orgDetails) {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.DONATIONS));
    const newLead = {
      id: 'don-' + Math.random().toString(36).substr(2, 9),
      donorName,
      donorEmail,
      amount: parseFloat(amount),
      type,
      orgDetails,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    list.push(newLead);
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(list));
    return { success: true, lead: newLead };
  },

  approveDonation(id) {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.DONATIONS));
    const leadIndex = list.findIndex(d => d.id === id);
    if (leadIndex === -1) return { success: false, error: 'Lead not found' };

    list[leadIndex].status = 'Approved';
    list[leadIndex].approvedAt = new Date().toISOString();

    // Automate sending payment details + QR code in customized email
    const emailLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.EMAIL_LOGS)) || [];
    const emailContent = {
      id: 'mail-' + Math.random().toString(36).substr(2, 9),
      to: list[leadIndex].donorEmail,
      subject: `Your Antariksa Foundation Donation Request was Approved!`,
      body: `Dear ${list[leadIndex].donorName},\n\nThank you for your generous pledge of $${list[leadIndex].amount} for our ${list[leadIndex].type.toUpperCase()} program.\n\nYour contribution lead has been verified and approved by the Antariksa Board.\n\nTo complete your contribution, please find our official payment details below:\n\n-- BANK DETAILS --\nBank Name: Federal Space Bank\nAccount Name: Antariksa Foundation\nAccount Number: 9876-0000-5555-1111\nIFSC/Route Code: ANTRIN11XX\n\n-- PAYMENT QR CODE --\nWe have attached your customized payment QR code to transfer directly: [QR-CODE-LINK: /public/icons.svg#qr-mock]\n\nPlease email a copy of the payment receipt once completed.\n\nThank you for supporting space workforce education!\n\nWarm regards,\nAntariksa Foundation Board`,
      sentAt: new Date().toISOString()
    };
    emailLogs.push(emailContent);
    localStorage.setItem(STORAGE_KEYS.EMAIL_LOGS, JSON.stringify(emailLogs));

    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(list));
    return { success: true };
  },

  rejectDonation(id) {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.DONATIONS));
    const filtered = list.filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEYS.DONATIONS, JSON.stringify(filtered));
    return { success: true };
  },

  // --- BILL OF EQUIPMENT (BOM/BIE) SERVICES ---
  getBOMSheets(division = '') {
    const sheets = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOM_SHEETS));
    if (division) return sheets.filter(s => s.division.toLowerCase() === division.toLowerCase());
    return sheets;
  },

  saveBOMSheet(id, name, division, rows) {
    const user = this.getCurrentUser();
    const sheets = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOM_SHEETS));
    const email = user ? user.email : 'system@antariksa.org';
    const timestamp = new Date().toISOString();

    if (id) {
      // Edit mode (Update)
      const sheetIndex = sheets.findIndex(s => s.id === id);
      if (sheetIndex !== -1) {
        sheets[sheetIndex].name = name;
        sheets[sheetIndex].rows = rows;
        sheets[sheetIndex].lastEditedBy = email;
        sheets[sheetIndex].lastEditedAt = timestamp;
      }
    } else {
      // Create mode (New sheet)
      const newSheet = {
        id: 'bom-' + Math.random().toString(36).substr(2, 9),
        name,
        division,
        rows,
        lastEditedBy: email,
        lastEditedAt: timestamp
      };
      sheets.push(newSheet);
    }
    localStorage.setItem(STORAGE_KEYS.BOM_SHEETS, JSON.stringify(sheets));
    return { success: true };
  },

  deleteBOMSheet(id) {
    const sheets = JSON.parse(localStorage.getItem(STORAGE_KEYS.BOM_SHEETS));
    const filtered = sheets.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.BOM_SHEETS, JSON.stringify(filtered));
    return { success: true };
  },

  // --- INVENTORY SERVICES ---
  getInventory(division = '') {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.INVENTORY));
    if (division) return list.filter(i => i.division.toLowerCase() === division.toLowerCase());
    return list;
  },

  saveInventoryItem(id, itemName, division, quantity, status) {
    const user = this.getCurrentUser();
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.INVENTORY));
    const email = user ? user.email : 'system@antariksa.org';
    const timestamp = new Date().toISOString();

    if (id) {
      const idx = list.findIndex(i => i.id === id);
      if (idx !== -1) {
        list[idx].itemName = itemName;
        list[idx].division = division;
        list[idx].quantity = parseInt(quantity);
        list[idx].status = status;
        list[idx].lastEditedBy = email;
        list[idx].lastEditedAt = timestamp;
      }
    } else {
      const newItem = {
        id: 'inv-' + Math.random().toString(36).substr(2, 9),
        itemName,
        division,
        quantity: parseInt(quantity),
        status,
        lastEditedBy: email,
        lastEditedAt: timestamp
      };
      list.push(newItem);
    }
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(list));
    return { success: true };
  },

  deleteInventoryItem(id) {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.INVENTORY));
    const filtered = list.filter(i => i.id !== id);
    localStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(filtered));
    return { success: true };
  },

  // --- PRESENTER MEDIA SERVICES ---
  getPresenterMedia() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PRESENTER_MEDIA));
  },

  addPresenterMedia(url, type, title, associatedCourse) {
    const user = this.getCurrentUser();
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRESENTER_MEDIA));
    const email = user ? user.email : 'presenter@antariksa.org';

    const newItem = {
      id: 'pm-' + Math.random().toString(36).substr(2, 9),
      url,
      type,
      title,
      associatedCourse,
      lastEditedBy: email,
      lastEditedAt: new Date().toISOString()
    };
    list.push(newItem);
    localStorage.setItem(STORAGE_KEYS.PRESENTER_MEDIA, JSON.stringify(list));
    return { success: true, item: newItem };
  },

  deletePresenterMedia(id) {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.PRESENTER_MEDIA));
    const filtered = list.filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.PRESENTER_MEDIA, JSON.stringify(filtered));
    return { success: true };
  },

  // --- EMAIL AUDIT LOGS ---
  getEmailLogs() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.EMAIL_LOGS)) || [];
  }
};
