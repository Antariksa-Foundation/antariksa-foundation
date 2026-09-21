import React, { useState, useEffect } from 'react';
import { db } from '../services/db';
import { 
  LogOut, Upload, Plus, Trash2, Check, X, FileSpreadsheet, 
  Layers, CreditCard, DollarSign, Settings, Clock, Mail, Copy, Video 
} from 'lucide-react';

const Admin = () => {
  const [currentUser, setCurrentUser] = useState(null);
  
  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Admin Dashboard Tabs
  // 'bom' | 'inventory' | 'reimbursements' | 'donations' | 'media' | 'gallery' | 'emails'
  const [activeTab, setActiveTab] = useState('bom');

  // Database lists
  const [reimbursements, setReimbursements] = useState([]);
  const [donations, setDonations] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [bomSheets, setBomSheets] = useState([]);
  const [inventories, setInventories] = useState([]);
  const [presenterMedia, setPresenterMedia] = useState([]);
  const [emailLogs, setEmailLogs] = useState([]);

  // Volunteer Submission State
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [receiptUrl, setReceiptUrl] = useState('');
  const [bankDetails, setBankDetails] = useState('');
  const [volSuccessMsg, setVolSuccessMsg] = useState('');

  // BOM Sheet Editor State
  const [selectedSheetId, setSelectedSheetId] = useState('');
  const [bomDivision, setBomDivision] = useState('rocket'); // rocket | cansat
  const [newSheetName, setNewSheetName] = useState('');
  
  // Inventory State
  const [invDivision, setInvDivision] = useState('rocket'); // rocket | satellite
  const [newInvName, setNewInvName] = useState('');
  const [newInvQty, setNewInvQty] = useState('');
  const [newInvStatus, setNewInvStatus] = useState('In Stock');

  // Course Presentation Media State (centralized in Admin)
  const [newMediaTitle, setNewMediaTitle] = useState('');
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaType, setNewMediaType] = useState('image');
  const [newMediaCourse, setNewMediaCourse] = useState('Model Rocketry 101');

  // Gallery Uploader State
  const [galUrl, setGalUrl] = useState('');
  const [galTitle, setGalTitle] = useState('');
  const [galDesc, setGalDesc] = useState('');
  const [galRatio, setGalRatio] = useState('3:2');

  // Payout Animation Overlay State (Razorpay Payouts)
  const [payoutProcess, setPayoutProcess] = useState(null); // null or { step: 0, amount: 0, name: '', id: '' }
  const [payoutSteps, setPayoutSteps] = useState([]);

  useEffect(() => {
    const user = db.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      loadAdminData();
    }
  }, []);

  const loadAdminData = () => {
    setReimbursements(db.getReimbursements());
    setDonations(db.getDonations());
    setGallery(db.getGallery());
    setBomSheets(db.getBOMSheets());
    setInventories(db.getInventory());
    setPresenterMedia(db.getPresenterMedia());
    setEmailLogs(db.getEmailLogs());
    
    // Auto-select first BOM sheet
    const sheets = db.getBOMSheets();
    if (sheets.length > 0 && !selectedSheetId) {
      setSelectedSheetId(sheets[0].id);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const res = db.login(email, password);
    if (res.success) {
      setCurrentUser(res.user);
      loadAdminData();
      setAuthError('');
    } else {
      setAuthError(res.error);
    }
  };

  const handleLogout = () => {
    db.logout();
    setCurrentUser(null);
    setEmail('');
    setPassword('');
  };

  // --- VOLUNTEER ACTIONS ---
  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    if (!amount || !reason || !receiptUrl || !bankDetails) return;

    db.addReimbursement(amount, reason, receiptUrl, bankDetails);
    setReimbursements(db.getReimbursements());
    setAmount('');
    setReason('');
    setReceiptUrl('');
    setBankDetails('');
    setVolSuccessMsg('Reimbursement request submitted for verification!');
    setTimeout(() => setVolSuccessMsg(''), 4000);
  };

  // --- REIMBURSEMENT PAYOUT WORKFLOW (RAZORPAY PAYOUTS SIMULATION) ---
  const triggerPayoutProcess = (req) => {
    setPayoutProcess({ step: 1, amount: req.amount, name: req.volunteerName, id: req.id });
    setPayoutSteps(['POST /v1/payouts called with contact & bank coordinates...']);

    setTimeout(() => {
      setPayoutProcess(p => ({ ...p, step: 2 }));
      setPayoutSteps(prev => [...prev, 'Status: queued (Checking Antariksa merchant account balance...)']);
    }, 1200);

    setTimeout(() => {
      setPayoutProcess(p => ({ ...p, step: 3 }));
      setPayoutSteps(prev => [...prev, 'Status: initiated (Routing payout transfer via IMPS instant payment gateway...)']);
    }, 2400);

    setTimeout(() => {
      const payoutId = 'pout_' + Math.random().toString(36).substr(2, 9);
      db.updateReimbursementStatus(req.id, 'Approved', payoutId);
      loadAdminData();
      setPayoutProcess(p => ({ ...p, step: 4 }));
      setPayoutSteps(prev => [...prev, `Status: processed (Success! Payout complete. ID: ${payoutId})`]);
    }, 3800);
  };

  const handleRejectReimbursement = (id) => {
    db.updateReimbursementStatus(id, 'Rejected');
    loadAdminData();
  };

  // --- DONATION VERIFICATION (SUPER ADMIN) ---
  const handleApproveDonation = (id) => {
    db.approveDonation(id);
    loadAdminData();
  };

  const handleRejectDonation = (id) => {
    db.rejectDonation(id);
    loadAdminData();
  };

  // --- CENTRALIZED COURSE MEDIA ACTIONS ---
  const handleAddMedia = (e) => {
    e.preventDefault();
    if (!newMediaTitle || !newMediaUrl) return;
    db.addPresenterMedia(newMediaUrl, newMediaType, newMediaTitle, newMediaCourse);
    loadAdminData();
    setNewMediaTitle('');
    setNewMediaUrl('');
  };

  const handleDeleteMedia = (id) => {
    db.deletePresenterMedia(id);
    loadAdminData();
  };

  // --- GALLERY ACTIONS ---
  const handleAddGallery = (e) => {
    e.preventDefault();
    db.addGalleryItem(galUrl, galTitle, galDesc, galRatio);
    loadAdminData();
    setGalUrl('');
    setGalTitle('');
    setGalDesc('');
  };

  const handleDeleteGallery = (id) => {
    db.deleteGalleryItem(id);
    loadAdminData();
  };

  // --- INVENTORY CRUD ---
  const handleAddInventory = (e) => {
    e.preventDefault();
    if (!newInvName || !newInvQty) return;
    db.saveInventoryItem(null, newInvName, invDivision, newInvQty, newInvStatus);
    loadAdminData();
    setNewInvName('');
    setNewInvQty('');
  };

  const handleDeleteInventory = (id) => {
    db.deleteInventoryItem(id);
    loadAdminData();
  };

  // --- BOM SPREADSHEET CRUD & CELL ACTIONS ---
  const handleCreateBOMSheet = (e) => {
    e.preventDefault();
    if (!newSheetName) return;
    const initialRows = [
      { id: 'r-' + Math.random().toString(36).substr(2, 9), item: 'New Material Item', quantity: 1, unitPrice: 0.00, bought: false, boughtDate: '' }
    ];
    db.saveBOMSheet(null, newSheetName, bomDivision, initialRows);
    loadAdminData();
    setNewSheetName('');
  };

  const currentSheet = bomSheets.find(s => s.id === selectedSheetId);

  const updateBOMRows = (updatedRows) => {
    if (!currentSheet) return;
    db.saveBOMSheet(currentSheet.id, currentSheet.name, currentSheet.division, updatedRows);
    loadAdminData();
  };

  const handleCellChange = (rowId, field, value) => {
    if (!currentSheet) return;
    const updated = currentSheet.rows.map(row => {
      if (row.id === rowId) {
        let val = value;
        if (field === 'quantity') val = parseInt(value) || 0;
        if (field === 'unitPrice') val = parseFloat(value) || 0;
        return { ...row, [field]: val };
      }
      return row;
    });
    updateBOMRows(updated);
  };

  const handleBoughtToggle = (rowId) => {
    if (!currentSheet) return;
    const updated = currentSheet.rows.map(row => {
      if (row.id === rowId) {
        const isBought = !row.bought;
        const stamp = isBought ? new Date().toLocaleString() : '';
        return { ...row, bought: isBought, boughtDate: stamp };
      }
      return row;
    });
    updateBOMRows(updated);
  };

  const handleAddBOMRow = () => {
    if (!currentSheet) return;
    const newRow = {
      id: 'r-' + Math.random().toString(36).substr(2, 9),
      item: 'Unnamed item',
      quantity: 1,
      unitPrice: 0.00,
      bought: false,
      boughtDate: ''
    };
    updateBOMRows([...currentSheet.rows, newRow]);
  };

  const handleDeleteBOMRow = (rowId) => {
    if (!currentSheet) return;
    const updated = currentSheet.rows.filter(r => r.id !== rowId);
    updateBOMRows(updated);
  };

  // Replicate Row
  const handleReplicateRow = (row) => {
    if (!currentSheet) return;
    const cloned = {
      ...row,
      id: 'r-' + Math.random().toString(36).substr(2, 9),
      item: `${row.item} (Clone)`,
      bought: false,
      boughtDate: ''
    };
    updateBOMRows([...currentSheet.rows, cloned]);
  };

  // Replicate Column
  const handleDoubleQuantities = () => {
    if (!currentSheet) return;
    const updated = currentSheet.rows.map(row => ({
      ...row,
      quantity: row.quantity * 2
    }));
    updateBOMRows(updated);
  };

  // Replicate Entire BOM Order
  const handleReplicateOrder = () => {
    if (!currentSheet) return;
    const newName = `${currentSheet.name} (Copy)`;
    const clonedRows = currentSheet.rows.map(r => ({
      ...r,
      id: 'r-' + Math.random().toString(36).substr(2, 9),
      bought: false,
      boughtDate: ''
    }));
    db.saveBOMSheet(null, newName, currentSheet.division, clonedRows);
    loadAdminData();
  };

  // CSV Spreadsheet File Parser
  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !currentSheet) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\n');
      const newRows = lines.map(line => {
        const parts = line.split(',');
        if (parts.length >= 3) {
          return {
            id: 'r-' + Math.random().toString(36).substr(2, 9),
            item: parts[0].replace(/"/g, '').trim(),
            quantity: parseInt(parts[1]) || 1,
            unitPrice: parseFloat(parts[2]) || 0.00,
            bought: false,
            boughtDate: ''
          };
        }
        return null;
      }).filter(Boolean);

      if (newRows.length > 0) {
        updateBOMRows([...currentSheet.rows, ...newRows]);
      }
    };
    reader.readAsText(file);
  };

  // Calculate BOM sum
  const getBOMTotal = (sheet) => {
    if (!sheet || !sheet.rows) return 0;
    return sheet.rows.reduce((sum, r) => sum + (r.quantity * r.unitPrice), 0).toFixed(2);
  };

  // --- RENDER BOOTSTRAP GATES ---
  if (!currentUser) {
    return (
      <div className="pt-[140px] pb-24 min-h-screen bg-sp-white flex items-center justify-center px-4 selection:bg-sp-blue selection:text-white">
        <div className="w-full max-w-md bg-white border-[6px] border-sp-black p-8 sm:p-10 shadow-[12px_12px_0_0_#0B0F19]">
          <div className="mb-8 text-center">
            <span className="bg-sp-blue text-white font-black text-xs uppercase px-3 py-1 border-[2px] border-sp-black shadow-[2px_2px_0_0_#000] tracking-widest">
              Control Center
            </span>
            <h2 className="text-3xl font-black text-sp-black uppercase tracking-tighter mt-4 font-sans">Admin Login</h2>
            <p className="text-sm text-gray-500 font-bold uppercase mt-2">Access Antariksa Portals</p>
          </div>

          {authError && (
            <div className="bg-red-50 border-[3px] border-red-600 p-3 text-red-700 text-sm font-bold mb-6">
              ⚠️ {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-sp-black uppercase tracking-widest">Portal Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-gray-50 border-[3px] border-sp-black px-4 py-3 focus:outline-none focus:bg-white text-lg rounded-none"
                placeholder="volunteer@antariksa.org or admin@antariksa.org"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-sp-black uppercase tracking-widest">Access Key</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-gray-50 border-[3px] border-sp-black px-4 py-3 focus:outline-none focus:bg-white text-lg rounded-none"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="w-full flex items-center justify-center gap-4 bg-sp-blue text-white py-4 font-black uppercase text-lg group hover:bg-sp-black transition-colors border-[3px] border-sp-black">
              Unlock Console <Play className="w-4 h-4 fill-white" />
            </button>
          </form>
          
          <div className="mt-8 text-[10px] text-gray-400 font-bold border-t border-gray-100 pt-4 leading-normal uppercase">
            <div className="text-gray-500 font-black mb-1">Testing accounts:</div>
            <div>Admin: <span className="text-sp-blue">admin@antariksa.org</span> / password: <span className="text-sp-blue">admin123</span></div>
            <div className="mt-1">Volunteer: <span className="text-sp-blue">volunteer@antariksa.org</span> / password: <span className="text-sp-blue">volunteer123</span></div>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER VOLUNTEER WORKSPACE ---
  if (currentUser.role === 'volunteer') {
    const myReimbursements = reimbursements.filter(r => r.volunteerEmail === currentUser.email);

    return (
      <div className="pt-[120px] pb-24 min-h-screen bg-sp-white selection:bg-sp-blue selection:text-white">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Dashboard */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12 pb-8 border-b-4 border-sp-black">
            <div>
              <h1 className="text-4xl font-black text-sp-black uppercase tracking-tight">Volunteer Workspace</h1>
              <p className="text-gray-600 font-medium mt-1">Authorized User: <strong className="text-sp-blue">{currentUser.name}</strong> ({currentUser.email})</p>
            </div>
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 bg-white text-sp-black border-[3px] border-sp-black px-4 py-2.5 hover:bg-red-50 transition-colors font-bold uppercase tracking-wider text-sm shadow-[3px_3px_0_0_#000]"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Reimbursement submission form */}
            <div className="col-span-1 border-[6px] border-sp-black bg-white p-6 sm:p-8 shadow-[8px_8px_0_0_#0B0F19]">
              <h2 className="text-2xl font-black text-sp-black uppercase tracking-tight mb-6 pb-2 border-b-2 border-gray-100 flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-sp-blue" /> Request Payout
              </h2>

              {volSuccessMsg && (
                <div className="bg-green-50 border-[3px] border-green-600 p-3 text-green-700 text-sm font-bold mb-6">
                  ✓ {volSuccessMsg}
                </div>
              )}

              <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-sp-black uppercase tracking-wider">Amount ($)</label>
                  <input 
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    required
                    className="w-full bg-gray-50 border-[2px] border-sp-black px-3 py-2 text-sm focus:outline-none focus:bg-white rounded-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-sp-black uppercase tracking-wider">Expenditure Description</label>
                  <input 
                    type="text"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="e.g. Model Rocket Engine Kits"
                    required
                    className="w-full bg-gray-50 border-[2px] border-sp-black px-3 py-2 text-sm focus:outline-none focus:bg-white rounded-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-sp-black uppercase tracking-wider">Receipt Link (JPEG/PDF URL)</label>
                  <input 
                    type="url"
                    value={receiptUrl}
                    onChange={(e) => setReceiptUrl(e.target.value)}
                    placeholder="https://imgur.com/your-receipt-link"
                    required
                    className="w-full bg-gray-50 border-[2px] border-sp-black px-3 py-2 text-sm focus:outline-none focus:bg-white rounded-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-sp-black uppercase tracking-wider">Your Bank Details (Wiring / Account Info)</label>
                  <textarea 
                    rows="3"
                    value={bankDetails}
                    onChange={(e) => setBankDetails(e.target.value)}
                    placeholder="Bank Name, Routing Code, Account Number, Account Full Name"
                    required
                    className="w-full bg-gray-50 border-[2px] border-sp-black px-3 py-2 text-sm focus:outline-none focus:bg-white rounded-none resize-none"
                  />
                </div>

                <button type="submit" className="w-full bg-sp-blue text-white py-3 font-black uppercase text-sm border-[2px] border-sp-black hover:bg-sp-black transition-all shadow-[3px_3px_0_0_#000]">
                  File Claim
                </button>
              </form>
            </div>

            {/* Past submissions history */}
            <div className="col-span-1 lg:col-span-2 border-[6px] border-sp-black bg-white p-6 sm:p-8 shadow-[8px_8px_0_0_#4F46E5]">
              <h2 className="text-2xl font-black text-sp-black uppercase tracking-tight mb-6 pb-2 border-b-2 border-gray-100">
                Your Payout History
              </h2>

              {myReimbursements.length === 0 ? (
                <p className="text-gray-500 font-bold uppercase text-center py-8">No payout requests submitted yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b-4 border-sp-black bg-gray-50 font-bold uppercase tracking-wider text-sp-black">
                        <th className="p-3">Filed Date</th>
                        <th className="p-3">Reason</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3 text-center">Receipt</th>
                        <th className="p-3 text-center">Status</th>
                        <th className="p-3">Tx Info</th>
                      </tr>
                    </thead>
                    <tbody className="font-medium text-gray-700">
                      {myReimbursements.map((r) => (
                        <tr key={r.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-3 whitespace-nowrap">{new Date(r.createdAt).toLocaleDateString()}</td>
                          <td className="p-3 font-bold text-sp-black">{r.reason}</td>
                          <td className="p-3 font-mono font-black text-sp-blue">${r.amount.toFixed(2)}</td>
                          <td className="p-3 text-center">
                            <a href={r.receiptUrl} target="_blank" rel="noreferrer" className="text-sp-blue underline font-bold uppercase hover:text-sp-black">View File</a>
                          </td>
                          <td className="p-3 text-center">
                            <span className={`inline-block px-2.5 py-0.5 border font-black uppercase text-[9px] ${
                              r.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-700' :
                              r.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-700' :
                              'bg-yellow-50 text-yellow-700 border-yellow-700'
                            }`}>
                              {r.status}
                            </span>
                          </td>
                          <td className="p-3 font-mono text-[9px]">{r.txId ? <><span className="block text-green-600 font-bold">INITIATED</span> {r.txId}</> : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    );
  }

  // --- RENDER SUPER ADMIN PANEL ---
  return (
    <div className="pt-[120px] pb-24 min-h-screen bg-sp-white selection:bg-sp-blue selection:text-white">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-6 border-b-4 border-sp-black">
          <div>
            <h1 className="text-4xl font-black text-sp-black uppercase tracking-tight">Super Admin Terminal</h1>
            <p className="text-gray-600 font-medium mt-1">Session Identity: <strong className="text-sp-blue">{currentUser.email}</strong></p>
          </div>
          <button 
            onClick={handleLogout} 
            className="flex items-center gap-2 bg-white text-sp-black border-[3px] border-sp-black px-4 py-2.5 hover:bg-red-50 transition-colors font-bold uppercase tracking-wider text-sm shadow-[3px_3px_0_0_#000]"
          >
            <LogOut className="w-4 h-4" /> Shutdown Console
          </button>
        </div>

        {/* Dashboard Tabs Grid Selector */}
        <div className="grid grid-cols-2 md:grid-cols-7 gap-3 mb-10">
          {[
            { id: 'bom', label: 'BIE / BOM Sheets', icon: FileSpreadsheet },
            { id: 'inventory', label: 'Equipment Inventory', icon: Layers },
            { id: 'reimbursements', label: 'Razorpay Payouts', icon: CreditCard },
            { id: 'donations', label: 'Donation Leads', icon: DollarSign },
            { id: 'media', label: 'Course Slide Media', icon: Video },
            { id: 'gallery', label: 'Gallery Bento Settings', icon: Settings },
            { id: 'emails', label: 'Mail Outbox Logs', icon: Mail }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center p-4 border-[3px] border-sp-black font-black uppercase text-[10px] tracking-wide gap-2 transition-all ${
                activeTab === tab.id 
                  ? 'bg-sp-blue text-white shadow-[4px_4px_0_0_#0B0F19]' 
                  : 'bg-white text-sp-black hover:bg-gray-50 active:translate-x-0.5 active:translate-y-0.5 shadow-[2px_2px_0_0_#0B0F19]'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-center">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* --- TAB CONTENT AREA --- */}

        {/* TAB 1: BOM SPREADSHEET GRID EDITOR */}
        {activeTab === 'bom' && (
          <div className="border-[6px] border-sp-black bg-white p-6 sm:p-8 shadow-[12px_12px_0_0_#0B0F19] space-y-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b-2 border-gray-100">
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-sp-black uppercase tracking-tight flex items-center gap-2">
                  <FileSpreadsheet className="w-7 h-7 text-sp-blue" /> Bill of Equipment / Materials (BOM)
                </h2>
                <p className="text-xs text-gray-500 font-bold uppercase">Multi-division CSV layout spreadsheets</p>
              </div>

              {/* Add New Sheet Form */}
              <form onSubmit={handleCreateBOMSheet} className="flex gap-2 w-full lg:w-auto">
                <input 
                  type="text" 
                  value={newSheetName}
                  onChange={(e) => setNewSheetName(e.target.value)}
                  placeholder="Sheet Name..." 
                  required
                  className="bg-gray-50 border-[2px] border-sp-black px-3 py-1.5 text-xs focus:outline-none focus:bg-white rounded-none flex-1 lg:w-48"
                />
                <select 
                  value={bomDivision} 
                  onChange={(e) => setBomDivision(e.target.value)}
                  className="bg-gray-50 border-[2px] border-sp-black px-2 py-1.5 text-xs focus:outline-none rounded-none"
                >
                  <option value="rocket">Rocket</option>
                  <option value="cansat">CanSat</option>
                </select>
                <button type="submit" className="bg-sp-blue text-white px-3 py-1.5 font-bold uppercase text-xs border-[2px] border-sp-black flex items-center gap-1 shadow-[2px_2px_0_0_#000]">
                  <Plus className="w-3.5 h-3.5" /> New
                </button>
              </form>
            </div>

            {/* Sheet Selector Strip */}
            <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4">
              {bomSheets.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSheetId(s.id)}
                  className={`px-3 py-2 text-xs font-black border-2 uppercase tracking-wide transition-all ${
                    s.id === selectedSheetId 
                      ? 'bg-sp-black text-white border-sp-black shadow-[3px_3px_0_0_#4F46E5]' 
                      : 'bg-gray-50 text-gray-500 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  [{s.division.toUpperCase()}] {s.name}
                </button>
              ))}
            </div>

            {/* SPREADSHEET TABLE GRID VIEW */}
            {currentSheet ? (
              <div className="space-y-6">
                
                {/* Spreadsheet controls */}
                <div className="flex flex-wrap gap-4 items-center justify-between bg-gray-50 p-4 border-2 border-sp-black text-xs">
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={handleAddBOMRow} 
                      className="bg-white text-sp-black px-4 py-2 border-[2px] border-sp-black hover:bg-gray-100 font-bold uppercase tracking-wider flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4 text-sp-blue" /> Add Row
                    </button>
                    <button 
                      onClick={handleDoubleQuantities}
                      className="bg-white text-sp-black px-4 py-2 border-[2px] border-sp-black hover:bg-gray-100 font-bold uppercase tracking-wider flex items-center gap-1"
                    >
                      <Copy className="w-4 h-4 text-sp-blue" /> Replicate Column (×2)
                    </button>
                    <button 
                      onClick={handleReplicateOrder}
                      className="bg-white text-sp-black px-4 py-2 border-[2px] border-sp-black hover:bg-gray-100 font-bold uppercase tracking-wider flex items-center gap-1"
                    >
                      <Copy className="w-4 h-4 text-sp-blue" /> Replicate Order (Copy)
                    </button>
                    <button 
                      onClick={() => db.deleteBOMSheet(currentSheet.id) && loadAdminData()}
                      className="bg-red-50 text-red-600 px-4 py-2 border-[2px] border-red-600 hover:bg-red-100 font-bold uppercase tracking-wider flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Delete Sheet
                    </button>
                  </div>

                  {/* CSV File Input */}
                  <div className="flex items-center gap-2 border-l-0 sm:border-l-2 border-gray-300 pl-0 sm:pl-4">
                    <span className="font-bold text-gray-500 uppercase text-[10px]">Import CSV:</span>
                    <label className="bg-sp-blue text-white px-4 py-2 border-[2px] border-sp-black hover:bg-sp-black cursor-pointer font-bold uppercase tracking-wider flex items-center gap-1">
                      <Upload className="w-4 h-4" /> Upload File
                      <input 
                        type="file" 
                        accept=".csv" 
                        onChange={handleCSVUpload} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                </div>

                {/* SPREADSHEET TABLE GRID CONTAINER */}
                <div className="overflow-x-auto border-2 border-sp-black shadow-[4px_4px_0_0_#0B0F19]">
                  <table className="w-full text-left border-collapse text-xs table-fixed">
                    <thead>
                      <tr className="border-b-4 border-sp-black bg-sp-black text-white font-black uppercase tracking-wider text-[10px]">
                        <th className="p-3 w-12 text-center">BOUGHT</th>
                        <th className="p-3 w-2/5">MATERIAL ITEM NAME</th>
                        <th className="p-3 w-20 text-center">QTY</th>
                        <th className="p-3 w-28 text-center">UNIT PRICE ($)</th>
                        <th className="p-3 w-28 text-center font-bold">TOTAL ($)</th>
                        <th className="p-3 w-40">TICK TIMESTAMP</th>
                        <th className="p-3 w-24 text-center">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-gray-100">
                      {currentSheet.rows.map((row, idx) => (
                        <tr key={row.id} className={`hover:bg-gray-50/50 ${row.bought ? 'bg-green-50/30' : ''}`}>
                          {/* Bought Checkbox */}
                          <td className="p-2 text-center border-r border-gray-100">
                            <button
                              onClick={() => handleBoughtToggle(row.id)}
                              className={`w-6 h-6 border-2 border-sp-black mx-auto flex items-center justify-center font-black ${row.bought ? 'bg-green-500 text-white' : 'bg-white'}`}
                            >
                              {row.bought && <Check className="w-4 h-4 stroke-[3]" />}
                            </button>
                          </td>
                          {/* Item Input */}
                          <td className="p-1.5 border-r border-gray-100">
                            <input 
                              type="text" 
                              value={row.item} 
                              onChange={(e) => handleCellChange(row.id, 'item', e.target.value)}
                              className="w-full bg-transparent px-2 py-1.5 font-bold focus:bg-white focus:outline-sp-blue text-sp-black text-xs" 
                            />
                          </td>
                          {/* Qty Input */}
                          <td className="p-1.5 border-r border-gray-100">
                            <input 
                              type="number" 
                              value={row.quantity} 
                              onChange={(e) => handleCellChange(row.id, 'quantity', e.target.value)}
                              className="w-full bg-transparent px-1 py-1.5 text-center font-mono focus:bg-white focus:outline-sp-blue" 
                            />
                          </td>
                          {/* Price Input */}
                          <td className="p-1.5 border-r border-gray-100">
                            <input 
                              type="number" 
                              step="0.01" 
                              value={row.unitPrice} 
                              onChange={(e) => handleCellChange(row.id, 'unitPrice', e.target.value)}
                              className="w-full bg-transparent px-1 py-1.5 text-right font-mono focus:bg-white focus:outline-sp-blue" 
                            />
                          </td>
                          {/* Row Total */}
                          <td className="p-3 text-right font-mono font-bold text-sp-black border-r border-gray-100">
                            ${(row.quantity * row.unitPrice).toFixed(2)}
                          </td>
                          {/* Timestamp column */}
                          <td className="p-3 font-mono text-[9px] text-gray-500 border-r border-gray-100">
                            {row.boughtDate ? (
                              <span className="flex items-center gap-1 text-green-600 font-bold">
                                <Clock className="w-3.5 h-3.5" /> {row.boughtDate}
                              </span>
                            ) : (
                              <span className="text-gray-300">Pending Purchase</span>
                            )}
                          </td>
                          {/* Copy / Delete row */}
                          <td className="p-1.5 text-center">
                            <div className="flex justify-center gap-1">
                              <button 
                                onClick={() => handleReplicateRow(row)}
                                className="text-sp-blue hover:bg-gray-100 p-1.5 border border-transparent hover:border-gray-200"
                                title="Duplicate Row"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              <button 
                                onClick={() => handleDeleteBOMRow(row.id)}
                                className="text-red-500 hover:bg-gray-100 p-1.5 border border-transparent hover:border-gray-200"
                                title="Delete Row"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Audit log & Total Info Footer */}
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-gray-50 p-4 border-2 border-sp-black text-xs font-bold font-mono">
                  <div className="text-gray-500 uppercase text-[9px] leading-relaxed">
                    Last Edited By: <span className="text-sp-blue font-black">{currentSheet.lastEditedBy}</span> <br/>
                    Last Sync Timestamp: <span className="text-sp-black">{new Date(currentSheet.lastEditedAt).toLocaleString()}</span>
                  </div>
                  <div className="bg-sp-blue text-white px-5 py-3 border-[2px] border-sp-black text-right text-base font-black shadow-[2px_2px_0_0_#000]">
                    SHEET TOTAL: ${getBOMTotal(currentSheet)}
                  </div>
                </div>

              </div>
            ) : (
              <p className="text-center font-bold text-gray-500 py-12">Select or create a sheet above.</p>
            )}
          </div>
        )}

        {/* TAB 2: EQUIPMENT INVENTORY MANAGER */}
        {activeTab === 'inventory' && (
          <div className="border-[6px] border-sp-black bg-white p-6 sm:p-8 shadow-[12px_12px_0_0_#0B0F19] space-y-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 pb-6 border-b-2 border-gray-100">
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-sp-black uppercase tracking-tight flex items-center gap-2">
                  <Layers className="w-7 h-7 text-sp-blue" /> Equipment & Hardware Inventory
                </h2>
                <p className="text-xs text-gray-500 font-bold uppercase">Store room inventory tracking database</p>
              </div>

              {/* Add Inventory Form */}
              <form onSubmit={handleAddInventory} className="flex flex-wrap gap-2 w-full lg:w-auto items-end">
                <div className="flex-1 min-w-[140px] space-y-1">
                  <label className="text-[9px] font-black uppercase text-gray-400">Item Name</label>
                  <input 
                    type="text" 
                    value={newInvName} 
                    onChange={(e) => setNewInvName(e.target.value)} 
                    placeholder="Radio transceiver..." 
                    required 
                    className="w-full bg-gray-50 border-[2px] border-sp-black px-2 py-1 text-xs focus:outline-none"
                  />
                </div>
                <div className="w-20 space-y-1">
                  <label className="text-[9px] font-black uppercase text-gray-400">Qty</label>
                  <input 
                    type="number" 
                    value={newInvQty} 
                    onChange={(e) => setNewInvQty(e.target.value)} 
                    placeholder="10" 
                    required 
                    className="w-full bg-gray-50 border-[2px] border-sp-black px-2 py-1 text-xs focus:outline-none text-center"
                  />
                </div>
                <div className="w-24 space-y-1">
                  <label className="text-[9px] font-black uppercase text-gray-400">Division</label>
                  <select 
                    value={invDivision} 
                    onChange={(e) => setInvDivision(e.target.value)} 
                    className="w-full bg-gray-50 border-[2px] border-sp-black px-2 py-1 text-xs focus:outline-none"
                  >
                    <option value="rocket">Rocket</option>
                    <option value="satellite">Satellite</option>
                  </select>
                </div>
                <div className="w-24 space-y-1">
                  <label className="text-[9px] font-black uppercase text-gray-400">Status</label>
                  <select 
                    value={newInvStatus} 
                    onChange={(e) => setNewInvStatus(e.target.value)} 
                    className="w-full bg-gray-50 border-[2px] border-sp-black px-2 py-1 text-xs focus:outline-none"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
                <button type="submit" className="bg-sp-blue text-white px-4 py-1.5 border-[2px] border-sp-black font-black uppercase text-xs shadow-[2px_2px_0_0_#000] h-[28px]">
                  Add Stock
                </button>
              </form>
            </div>

            {/* Inventory Divisions Split rendering */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {['rocket', 'satellite'].map(div => {
                const list = inventories.filter(item => item.division === div);
                return (
                  <div key={div} className="border-[4px] border-sp-black bg-gray-50 p-6 flex flex-col justify-between shadow-[6px_6px_0_0_#000]">
                    <div>
                      <span className="inline-block bg-sp-black text-white font-black text-[10px] uppercase px-3 py-1 border-[2px] border-white shadow-[2px_2px_0_0_#000] tracking-widest mb-4">
                        {div === 'rocket' ? '🚀 Rocketry Division' : '🛰️ CanSat / Satellite Division'}
                      </span>
                      
                      {list.length === 0 ? (
                        <p className="text-gray-500 font-bold uppercase text-center py-6 text-xs border border-dashed border-gray-300 mt-2">No inventory listed.</p>
                      ) : (
                        <div className="overflow-x-auto bg-white border-2 border-sp-black">
                          <table className="w-full text-left border-collapse text-xs">
                            <thead>
                              <tr className="border-b-2 border-sp-black bg-gray-100 font-bold uppercase tracking-wider text-sp-black">
                                <th className="p-2">Item Name</th>
                                <th className="p-2 text-center">Qty</th>
                                <th className="p-2 text-center">Status</th>
                                <th className="p-2">Audits</th>
                                <th className="p-2 text-center">Action</th>
                              </tr>
                            </thead>
                            <tbody className="font-medium text-gray-700">
                              {list.map((item) => (
                                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                                  <td className="p-2 font-bold text-sp-black">{item.itemName}</td>
                                  <td className="p-2 text-center font-mono font-bold text-sp-blue">{item.quantity}</td>
                                  <td className="p-2 text-center">
                                    <span className={`inline-block px-2 py-0.5 border text-[9px] font-black uppercase ${
                                      item.status === 'In Stock' ? 'bg-green-50 text-green-700 border-green-700' :
                                      item.status === 'Low Stock' ? 'bg-yellow-50 text-yellow-700 border-yellow-700' :
                                      'bg-red-50 text-red-700 border-red-700'
                                    }`}>
                                      {item.status}
                                    </span>
                                  </td>
                                  <td className="p-2 font-mono text-[8px] text-gray-500 leading-normal">
                                    <span>Last user: {item.lastEditedBy.split('@')[0]}</span> <br/>
                                    <span>{new Date(item.lastEditedAt).toLocaleDateString()}</span>
                                  </td>
                                  <td className="p-2 text-center">
                                    <button 
                                      onClick={() => handleDeleteInventory(item.id)}
                                      className="text-red-600 hover:text-red-800 transition-colors p-1"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: REIMBURSEMENT RAZORPAY PAYOUTS */}
        {activeTab === 'reimbursements' && (
          <div className="border-[6px] border-sp-black bg-white p-6 sm:p-8 shadow-[12px_12px_0_0_#0B0F19] space-y-6">
            <div className="pb-4 border-b-2 border-gray-100">
              <h2 className="text-2xl font-black text-sp-black uppercase tracking-tight flex items-center gap-2">
                <CreditCard className="w-7 h-7 text-sp-blue" /> Razorpay Payouts Dashboard
              </h2>
              <p className="text-xs text-gray-500 font-bold uppercase">Approve volunteer payouts securely via Razorpay API simulation</p>
            </div>

            {reimbursements.length === 0 ? (
              <p className="text-gray-500 font-bold uppercase text-center py-12">No requests filed.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b-4 border-sp-black bg-gray-50 font-bold uppercase tracking-wider text-sp-black">
                      <th className="p-3">Volunteer</th>
                      <th className="p-3">Reason</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Receipt</th>
                      <th className="p-3">Bank Account coordinates</th>
                      <th className="p-3 text-center">Status</th>
                      <th className="p-3">Razorpay Payout ID</th>
                      <th className="p-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="font-medium text-gray-700">
                    {reimbursements.map((r) => (
                      <tr key={r.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-3">
                          <strong className="text-sp-black">{r.volunteerName}</strong>
                          <span className="block text-[10px] text-gray-400 font-mono">{r.volunteerEmail}</span>
                        </td>
                        <td className="p-3 font-semibold text-sp-black">{r.reason}</td>
                        <td className="p-3 font-mono font-black text-sp-blue text-sm">${r.amount.toFixed(2)}</td>
                        <td className="p-3">
                          <a href={r.receiptUrl} target="_blank" rel="noreferrer" className="text-sp-blue underline font-bold uppercase hover:text-sp-black">View Receipt</a>
                        </td>
                        <td className="p-3 text-[10px] max-w-xs truncate font-mono text-gray-500" title={r.bankDetails}>
                          {r.bankDetails}
                        </td>
                        <td className="p-3 text-center">
                          <span className={`inline-block px-2.5 py-0.5 border font-black uppercase text-[9px] ${
                            r.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-700' :
                            r.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-700' :
                            'bg-yellow-50 text-yellow-700 border-yellow-700'
                          }`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="p-3 font-mono text-[9px]">
                          {r.txId ? (
                            <div>
                              <span className="text-green-600 font-bold block">payout.processed</span>
                              <span className="text-gray-400 font-semibold text-[8px] block">Time: {new Date(r.approvedAt).toLocaleString()}</span>
                              <span>{r.txId}</span>
                            </div>
                          ) : '—'}
                        </td>
                        <td className="p-3 text-center">
                          {r.status === 'Pending' ? (
                            <div className="flex justify-center gap-2">
                              <button 
                                onClick={() => triggerPayoutProcess(r)}
                                className="bg-green-500 text-white p-2 border-[2px] border-sp-black shadow-[2px_2px_0_0_#000] hover:bg-green-600 active:translate-x-0.5 active:translate-y-0.5 hover:shadow-none font-bold text-xs"
                                title="Process via Razorpay Payouts"
                              >
                                PAYOUT
                              </button>
                              <button 
                                onClick={() => handleRejectReimbursement(r.id)}
                                className="bg-red-500 text-white p-2 border-[2px] border-sp-black shadow-[2px_2px_0_0_#000] hover:bg-red-600 active:translate-x-0.5 active:translate-y-0.5 hover:shadow-none"
                                title="Decline request"
                              >
                                <X className="w-4 h-4 stroke-[3]" />
                              </button>
                            </div>
                          ) : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: DONATION INTAKE LEADS */}
        {activeTab === 'donations' && (
          <div className="border-[6px] border-sp-black bg-white p-6 sm:p-8 shadow-[12px_12px_0_0_#0B0F19] space-y-6">
            <div className="pb-4 border-b-2 border-gray-100">
              <h2 className="text-2xl font-black text-sp-black uppercase tracking-tight flex items-center gap-2">
                <DollarSign className="w-7 h-7 text-sp-blue" /> Donation Leads Verification Queue
              </h2>
              <p className="text-xs text-gray-500 font-bold uppercase">Approve inquiries to automate QR / bank code emails</p>
            </div>

            {donations.length === 0 ? (
              <p className="text-gray-500 font-bold uppercase text-center py-12">No pending donation inquiries found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b-4 border-sp-black bg-gray-50 font-bold uppercase tracking-wider text-sp-black">
                      <th className="p-3">Donor Name</th>
                      <th className="p-3">Email Address</th>
                      <th className="p-3">Pledge Amount</th>
                      <th className="p-3 text-center">Type</th>
                      <th className="p-3">Org Details</th>
                      <th className="p-3 text-center">Status</th>
                      <th className="p-3 text-center">Compliance Action</th>
                    </tr>
                  </thead>
                  <tbody className="font-medium text-gray-700">
                    {donations.map((d) => (
                      <tr key={d.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-3 font-bold text-sp-black">{d.donorName}</td>
                        <td className="p-3 font-mono">{d.donorEmail}</td>
                        <td className="p-3 font-mono font-black text-sp-blue text-sm">${d.amount.toFixed(2)}</td>
                        <td className="p-3 text-center">
                          <span className="bg-sp-black text-white px-2 py-0.5 border border-white text-[9px] uppercase font-mono font-black">{d.type}</span>
                        </td>
                        <td className="p-3 text-gray-500">{d.orgDetails || '—'}</td>
                        <td className="p-3 text-center">
                          <span className={`inline-block px-2.5 py-0.5 border font-black uppercase text-[9px] ${
                            d.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-700' :
                            'bg-yellow-50 text-yellow-700 border-yellow-700'
                          }`}>
                            {d.status}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          {d.status === 'Pending' ? (
                            <div className="flex justify-center gap-2">
                              <button 
                                onClick={() => handleApproveDonation(d.id)}
                                className="bg-sp-blue text-white px-3 py-1.5 border-[2px] border-sp-black font-black uppercase text-[9px] shadow-[2px_2px_0_0_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                              >
                                Approve & Mail Codes
                              </button>
                              <button 
                                onClick={() => handleRejectDonation(d.id)}
                                className="text-red-600 hover:bg-red-50 px-2 py-1.5 border border-transparent hover:border-red-600"
                              >
                                Decline
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px]">Codes Dispatched</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: CENTRALIZED COURSE SLIDE MEDIA UPLOADS */}
        {activeTab === 'media' && (
          <div className="border-[6px] border-sp-black bg-white p-6 sm:p-8 shadow-[12px_12px_0_0_#0B0F19] space-y-8">
            <div className="pb-4 border-b-2 border-gray-100">
              <h2 className="text-2xl font-black text-sp-black uppercase tracking-tight flex items-center gap-2">
                <Video className="w-7 h-7 text-sp-blue" /> Presenter Course Media Manager
              </h2>
              <p className="text-xs text-gray-500 font-bold uppercase">Upload slide diagrams and instruction videos for courses</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Upload Form */}
              <form onSubmit={handleAddMedia} className="col-span-1 border-4 border-sp-black bg-gray-50 p-6 space-y-4">
                <h3 className="font-black text-sp-black uppercase text-sm mb-4">Upload Asset to Course</h3>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-sp-black uppercase tracking-wider">Asset Title</label>
                  <input 
                    type="text" 
                    value={newMediaTitle} 
                    onChange={(e) => setNewMediaTitle(e.target.value)} 
                    placeholder="e.g. Avionics Wiring layout" 
                    required 
                    className="w-full bg-white border-2 border-sp-black px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-sp-black uppercase tracking-wider">Cloudflare R2 File Link</label>
                  <input 
                    type="url" 
                    value={newMediaUrl} 
                    onChange={(e) => setNewMediaUrl(e.target.value)} 
                    placeholder="https://pub-r2.cloudflare.com/..." 
                    required 
                    className="w-full bg-white border-2 border-sp-black px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-sp-black uppercase tracking-wider">Asset Type</label>
                  <select 
                    value={newMediaType} 
                    onChange={(e) => setNewMediaType(e.target.value)} 
                    className="w-full bg-white border-2 border-sp-black px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="image">Static Image / Chart</option>
                    <option value="video">Instructional MP4 Video</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-sp-black uppercase tracking-wider">Associate with Slide Deck</label>
                  <select 
                    value={newMediaCourse} 
                    onChange={(e) => setNewMediaCourse(e.target.value)} 
                    className="w-full bg-white border-2 border-sp-black px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="Model Rocketry 101">Model Rocketry 101</option>
                    <option value="CanSat Telemetry">CanSat Telemetry & Sensors</option>
                    <option value="Orbital Mechanics">Orbital Mechanics & Kepler's Laws</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-sp-blue text-white py-3 border-2 border-sp-black font-black uppercase text-xs shadow-[2px_2px_0_0_#000]">
                  Save & Publish to Slide Deck
                </button>
              </form>

              {/* Media List */}
              <div className="col-span-1 lg:col-span-2 border-2 border-sp-black bg-white p-4">
                <h4 className="font-bold text-sp-black text-xs uppercase mb-4 tracking-wider">Live Course Assets</h4>
                {presenterMedia.length === 0 ? (
                  <p className="text-gray-400 text-xs font-bold uppercase py-6 text-center">No presentation media uploaded.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {presenterMedia.map(m => (
                      <div key={m.id} className="border-2 border-sp-black p-3 bg-gray-50 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center text-[9px] font-black uppercase text-sp-blue mb-1">
                            <span>{m.type}</span>
                            <span>{m.associatedCourse}</span>
                          </div>
                          <h5 className="font-bold text-sp-black text-xs truncate mb-2">{m.title}</h5>
                          <div className="aspect-[16/9] border border-sp-black bg-gray-200 overflow-hidden mb-3">
                            {m.type === 'video' ? (
                              <video src={m.url} className="w-full h-full object-cover" muted loop autoPlay />
                            ) : (
                              <img src={m.url} alt={m.title} className="w-full h-full object-cover" />
                            )}
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-[8px] font-mono text-gray-400 pt-2 border-t border-gray-200/50">
                          <span className="truncate w-3/4">URL: {m.url}</span>
                          <button 
                            onClick={() => handleDeleteMedia(m.id)} 
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: GALLERY CONTENT ARCHIVE */}
        {activeTab === 'gallery' && (
          <div className="border-[6px] border-sp-black bg-white p-6 sm:p-8 shadow-[12px_12px_0_0_#0B0F19] space-y-8">
            <div className="pb-4 border-b-2 border-gray-100">
              <h2 className="text-2xl font-black text-sp-black uppercase tracking-tight flex items-center gap-2">
                <Settings className="w-7 h-7 text-sp-blue" /> Public Gallery Settings
              </h2>
              <p className="text-xs text-gray-500 font-bold uppercase">Insert images to build out the public bento masonry</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Add form */}
              <form onSubmit={handleAddGallery} className="col-span-1 border-4 border-sp-black bg-gray-50 p-6 space-y-4">
                <h3 className="font-black text-sp-black uppercase text-sm mb-4">Add Photo to Bento</h3>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-sp-black uppercase tracking-wider">Cloudflare R2 Link</label>
                  <input 
                    type="url" 
                    value={galUrl} 
                    onChange={(e) => setGalUrl(e.target.value)} 
                    placeholder="https://pub-r2.cloudflare.com/..." 
                    required 
                    className="w-full bg-white border-2 border-sp-black px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-sp-black uppercase tracking-wider">Photo Title</label>
                  <input 
                    type="text" 
                    value={galTitle} 
                    onChange={(e) => setGalTitle(e.target.value)} 
                    placeholder="e.g. Model Rocket Apogee" 
                    required 
                    className="w-full bg-white border-2 border-sp-black px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-sp-black uppercase tracking-wider">Short Description</label>
                  <input 
                    type="text" 
                    value={galDesc} 
                    onChange={(e) => setGalDesc(e.target.value)} 
                    placeholder="e.g. Recovery system test stage" 
                    required 
                    className="w-full bg-white border-2 border-sp-black px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-sp-black uppercase tracking-wider">Estimated Aspect Ratio</label>
                  <select 
                    value={galRatio} 
                    onChange={(e) => setGalRatio(e.target.value)} 
                    className="w-full bg-white border-2 border-sp-black px-3 py-2 text-xs focus:outline-none"
                  >
                    <option value="3:2">Horizontal Standard (3:2)</option>
                    <option value="4:3">Camera Compact (4:3)</option>
                    <option value="1:1">Square Grid (1:1)</option>
                    <option value="2:3">Vertical Portrait (2:3)</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-sp-blue text-white py-3 border-2 border-sp-black font-black uppercase text-xs shadow-[2px_2px_0_0_#000]">
                  Publish to Bento
                </button>
              </form>

              {/* Grid List */}
              <div className="col-span-1 lg:col-span-2 border-2 border-sp-black bg-white p-4">
                <h4 className="font-bold text-sp-black text-xs uppercase mb-4 tracking-wider">Live Bento Items</h4>
                {gallery.length === 0 ? (
                  <p className="text-gray-400 text-xs font-bold uppercase py-6 text-center">No images.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {gallery.map(g => (
                      <div key={g.id} className="border-2 border-sp-black p-2 bg-gray-50 flex flex-col justify-between">
                        <div className="aspect-[4/3] border border-sp-black bg-gray-200 overflow-hidden mb-2">
                          <img src={g.url} alt={g.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-[9px] font-bold text-sp-black truncate w-3/4">{g.title}</span>
                          <button 
                            onClick={() => handleDeleteGallery(g.id)} 
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: EMAIL SYSTEM OUTGOING MONITOR LOGS */}
        {activeTab === 'emails' && (
          <div className="border-[6px] border-sp-black bg-white p-6 sm:p-8 shadow-[12px_12px_0_0_#0B0F19] space-y-6">
            <div className="pb-4 border-b-2 border-gray-100">
              <h2 className="text-2xl font-black text-sp-black uppercase tracking-tight flex items-center gap-2">
                <Mail className="w-7 h-7 text-sp-blue" /> Automated Outgoing Email Dispatch Logs
              </h2>
              <p className="text-xs text-gray-500 font-bold uppercase">Audit automated payment codes and volunteer notifications</p>
            </div>

            {emailLogs.length === 0 ? (
              <p className="text-gray-500 font-bold uppercase text-center py-12">No emails have been dispatched by the server triggers yet.</p>
            ) : (
              <div className="space-y-4">
                {emailLogs.map((log) => (
                  <div key={log.id} className="border-[3px] border-sp-black bg-gray-50 p-5 font-mono text-[11px] shadow-[4px_4px_0_0_#000]">
                    <div className="flex flex-wrap justify-between items-center border-b border-gray-200 pb-3 mb-3 text-sp-black">
                      <div>
                        <strong>TO:</strong> <span className="text-sp-blue">{log.to}</span> <br/>
                        <strong>SUBJECT:</strong> <span className="font-bold text-sp-black">{log.subject}</span>
                      </div>
                      <span className="text-[9px] text-gray-400 font-bold">Dispatched: {new Date(log.sentAt).toLocaleString()}</span>
                    </div>
                    <pre className="whitespace-pre-line text-gray-700 leading-relaxed font-sans text-xs bg-white p-4 border border-gray-200 max-h-[220px] overflow-y-auto">
                      {log.body}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* RAZORPAY TRANSACTIONAL LOADER POPUP OVERLAY */}
      {payoutProcess && (
        <div className="fixed inset-0 z-50 bg-sp-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border-[6px] border-sp-black p-8 shadow-[16px_16px_0_0_#000] relative text-sp-black">
            <div className="text-center mb-6">
              <span className="bg-sp-blue text-white font-black text-[9px] uppercase px-3 py-1 border-2 border-sp-black tracking-widest animate-pulse">
                Razorpay API Gateway Active
              </span>
              <h3 className="text-2xl font-black text-sp-black uppercase tracking-tight mt-4">Initiating Transfer</h3>
              <p className="text-xs text-gray-500 font-bold uppercase mt-1">Beneficiary: <span className="text-sp-blue">{payoutProcess.name}</span> (${payoutProcess.amount.toFixed(2)})</p>
            </div>

            {/* Steps Console Output */}
            <div className="bg-sp-black p-4 font-mono text-[10px] text-green-400 space-y-2 border-2 border-sp-black max-h-[160px] overflow-y-auto mb-6">
              {payoutSteps.map((step, idx) => (
                <div key={idx} className="flex gap-2">
                  <span>&gt;</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>

            {payoutProcess.step === 4 ? (
              <button 
                onClick={() => setPayoutProcess(null)}
                className="w-full bg-green-500 text-white font-black uppercase text-xs py-3 border-[2px] border-sp-black shadow-[3px_3px_0_0_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
              >
                Close Gateway Session
              </button>
            ) : (
              <div className="w-full h-2.5 bg-gray-100 border-[2px] border-sp-black relative overflow-hidden">
                <div className="absolute top-0 bottom-0 left-0 bg-sp-blue animate-[ping_1.5s_infinite] w-full origin-left" style={{ transform: `scaleX(${payoutProcess.step / 4})` }} />
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Admin;
