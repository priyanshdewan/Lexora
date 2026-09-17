import React, { useState } from 'react';
import { Database, Plus, Search, FileText, Check, AlertCircle, Layers, Calendar, DollarSign, Building } from 'lucide-react';
import { ragEngine } from '../services/ragEngine.js';
import { useTheme } from '../context/ThemeContext.jsx';

export const KnowledgeBaseView = ({ onCorpusUpdated }) => {
  const [documents, setDocuments] = useState(ragEngine.getAllDocuments());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // New document form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('statute');
  const [tier, setTier] = useState(1);
  const [authority, setAuthority] = useState('');
  const [jurisdiction, setJurisdiction] = useState('National');
  const [sectionNumber, setSectionNumber] = useState('');
  const [clause, setClause] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [sectionTitle, setSectionTitle] = useState('');
  const [content, setContent] = useState('');
  const [fees, setFees] = useState('');
  const [deadlines, setDeadlines] = useState('');
  const [portal, setPortal] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const totalSections = documents.reduce((acc, doc) => acc + doc.sections.length, 0);

  const filteredDocs = documents.filter(doc => {
    const matchesQuery = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.authority.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.sections.some(s => s.content.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTier = selectedTier === 'all' || doc.tier.toString() === selectedTier;
    return matchesQuery && matchesTier;
  });

  const handleAddDocument = (e) => {
    e.preventDefault();
    if (!title || !content || !sectionNumber) return;

    const newDoc = {
      id: `doc-custom-${Date.now()}`,
      title,
      category,
      tier: parseInt(tier, 10),
      authority: authority || 'Designated Statutory Authority',
      jurisdiction: jurisdiction || 'National',
      publicationDate: new Date().toISOString().split('T')[0],
      effectiveDate: new Date().toISOString().split('T')[0],
      sections: [
        {
          sectionNumber,
          clause: clause || 'General',
          pageNumber: parseInt(pageNumber, 10) || 1,
          title: sectionTitle || sectionNumber,
          content,
          fees: fees || 'As prescribed by the applicable rules.',
          deadlines: deadlines || 'Within statutory limitation period.',
          portal: portal || 'Designated filing office or portal.'
        }
      ]
    };

    ragEngine.saveCustomDocument(newDoc);
    setDocuments(ragEngine.getAllDocuments());
    if (onCorpusUpdated) onCorpusUpdated();
    
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setShowAddModal(false);
      // Reset
      setTitle('');
      setSectionNumber('');
      setSectionTitle('');
      setContent('');
      setFees('');
      setDeadlines('');
      setPortal('');
    }, 1000);
  };

  const { isDark } = useTheme();

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 space-y-8 transition-colors ${
      isDark ? 'text-slate-100' : 'text-slate-900'
    }`}>
      
      {/* Top Banner with Real Metrics Only (No fake customer numbers) */}
      <div className={`flex flex-col md:flex-row md:items-center justify-between pb-6 border-b gap-4 ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div>
          <div className={`flex items-center space-x-2 text-xs font-mono uppercase tracking-wider mb-1 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}>
            <Database className={`w-4 h-4 ${isDark ? 'text-slate-300' : 'text-slate-600'}`} />
            <span>Statutory Knowledge Base and Document Store</span>
          </div>
          <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Legal Corpus Repository
          </h1>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Indexed primary legal sources used for RAG retrieval and citation grounding.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className={`flex items-center space-x-2 px-4 py-2 border rounded-md text-xs font-medium transition-colors self-start md:self-auto ${
            isDark 
              ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200' 
              : 'bg-slate-900 hover:bg-slate-800 border-slate-900 text-white shadow-xs'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Legal Document</span>
        </button>
      </div>

      {/* Real Corpus Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className={`border rounded-md p-4 space-y-1 transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <span className={`text-[11px] font-mono uppercase block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Indexed Acts / Statutes
          </span>
          <span className={`text-xl font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {documents.length}
          </span>
        </div>
        <div className={`border rounded-md p-4 space-y-1 transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <span className={`text-[11px] font-mono uppercase block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Total Sections / Chunks
          </span>
          <span className={`text-xl font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {totalSections}
          </span>
        </div>
        <div className={`border rounded-md p-4 space-y-1 transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <span className={`text-[11px] font-mono uppercase block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Primary Hierarchy
          </span>
          <span className={`text-xl font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Tier 1 & 2
          </span>
        </div>
        <div className={`border rounded-md p-4 space-y-1 transition-colors ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <span className={`text-[11px] font-mono uppercase block ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Retrieval Engine
          </span>
          <span className={`text-xl font-bold font-mono ${isDark ? 'text-white' : 'text-slate-900'}`}>
            BM25 + TF-IDF
          </span>
        </div>
      </div>

      {/* Search and Tier Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search indexed statutes, sections, keywords, or authorities..."
            className={`w-full border rounded-md pl-9 pr-4 py-2 text-xs focus:outline-none transition-colors ${
              isDark 
                ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-slate-600' 
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-500'
            }`}
          />
        </div>

        <select
          value={selectedTier}
          onChange={(e) => setSelectedTier(e.target.value)}
          className={`border text-xs rounded-md px-3 py-2 focus:outline-none w-full sm:w-auto transition-colors ${
            isDark 
              ? 'bg-slate-950 border-slate-800 text-slate-300 focus:border-slate-600' 
              : 'bg-white border-slate-300 text-slate-800 focus:border-slate-500'
          }`}
        >
          <option value="all">All Priority Tiers</option>
          <option value="1">Tier 1: Official Laws and Statutes</option>
          <option value="2">Tier 2: Government Rules and Regulations</option>
          <option value="3">Tier 3: Government Notifications</option>
          <option value="4">Tier 4: Procedural Guidelines</option>
          <option value="5">Tier 5: Official Forms</option>
          <option value="6">Tier 6: Court Rules and Judgments</option>
        </select>
      </div>

      {/* Document Listing */}
      <div className="space-y-4">
        {filteredDocs.map((doc) => (
          <div key={doc.id} className={`border rounded-md p-5 space-y-4 transition-colors ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-xs'
          }`}>
            
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b gap-2 ${
              isDark ? 'border-slate-850' : 'border-slate-200'
            }`}>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className={`font-semibold text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>{doc.title}</h3>
                  <span className={`px-2 py-0.5 border text-[10px] font-mono rounded-sm ${
                    isDark ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-300 text-slate-700'
                  }`}>
                    Tier {doc.tier}
                  </span>
                </div>
                <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Authority: {doc.authority} | Jurisdiction: {doc.jurisdiction}
                </p>
              </div>
              <span className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {doc.sections.length} {doc.sections.length === 1 ? 'Section' : 'Sections'} Indexed
              </span>
            </div>

            {/* Sections Accordion / Listing */}
            <div className="space-y-3">
              {doc.sections.map((sec, sIdx) => (
                <div key={sIdx} className={`border rounded-md p-4 space-y-2.5 text-xs transition-colors ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center space-x-2 font-medium ${isDark ? 'text-slate-200' : 'text-slate-900'}`}>
                      <FileText className={`w-3.5 h-3.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
                      <span>{sec.sectionNumber} {sec.clause ? `(${sec.clause})` : ''}: {sec.title}</span>
                    </div>
                    <span className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Page {sec.pageNumber}</span>
                  </div>

                  <p className={`leading-relaxed pl-5 font-sans ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {sec.content}
                  </p>

                  <div className={`grid grid-cols-1 sm:grid-cols-3 gap-2 pl-5 pt-2 border-t text-[11px] ${
                    isDark ? 'border-slate-900 text-slate-400' : 'border-slate-200 text-slate-600'
                  }`}>
                    <div>
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Prescribed Fee:</span> <span className={isDark ? 'text-slate-200' : 'text-slate-900'}>{sec.fees}</span>
                    </div>
                    <div>
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Statutory Deadline:</span> <span className={`${isDark ? 'text-amber-400' : 'text-amber-700'} font-medium`}>{sec.deadlines}</span>
                    </div>
                    <div>
                      <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Filing Portal:</span> <span className={isDark ? 'text-slate-200' : 'text-slate-900'}>{sec.portal}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

      {/* Add Custom Document Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 overflow-y-auto backdrop-blur-xs">
          <div className={`border rounded-md w-full max-w-2xl shadow-2xl p-6 space-y-4 my-8 transition-colors ${
            isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
          }`}>
            <div className={`border-b pb-3 flex items-center justify-between ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <h2 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Add Legal Document to Knowledge Base
              </h2>
              <button 
                onClick={() => setShowAddModal(false)} 
                className={`text-sm ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleAddDocument} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Document / Statute Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. State Tenancy Regulations, 2024"
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none transition-colors ${
                      isDark 
                        ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-slate-600' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-500'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Governing Authority</label>
                  <input
                    type="text"
                    value={authority}
                    onChange={(e) => setAuthority(e.target.value)}
                    placeholder="e.g. Department of Revenue"
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none transition-colors ${
                      isDark 
                        ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-slate-600' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-500'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className={`block font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Priority Tier</label>
                  <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value)}
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none transition-colors ${
                      isDark 
                        ? 'bg-slate-950 border-slate-800 text-white focus:border-slate-600' 
                        : 'bg-white border-slate-300 text-slate-900 focus:border-slate-500'
                    }`}
                  >
                    <option value="1">Tier 1: Law / Statute</option>
                    <option value="2">Tier 2: Rule / Regulation</option>
                    <option value="3">Tier 3: Notification</option>
                    <option value="4">Tier 4: Guideline</option>
                    <option value="5">Tier 5: Form</option>
                    <option value="6">Tier 6: Court Rule</option>
                  </select>
                </div>
                <div>
                  <label className={`block font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Section / Article *</label>
                  <input
                    type="text"
                    required
                    value={sectionNumber}
                    onChange={(e) => setSectionNumber(e.target.value)}
                    placeholder="e.g. Section 14"
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none transition-colors ${
                      isDark 
                        ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-slate-600' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-500'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Page Number</label>
                  <input
                    type="number"
                    value={pageNumber}
                    onChange={(e) => setPageNumber(e.target.value)}
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none transition-colors ${
                      isDark 
                        ? 'bg-slate-950 border-slate-800 text-white focus:border-slate-600' 
                        : 'bg-white border-slate-300 text-slate-900 focus:border-slate-500'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Section Heading / Description</label>
                <input
                  type="text"
                  value={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                  placeholder="e.g. Mandatory Notice Period Prior to Eviction"
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none transition-colors ${
                    isDark 
                      ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-slate-600' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-500'
                  }`}
                />
              </div>

              <div>
                <label className={`block font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Statutory Provision Text (Chunk Content) *</label>
                <textarea
                  rows="4"
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste the verified statutory text or procedural instruction here..."
                  className={`w-full border rounded-md px-3 py-2 focus:outline-none font-sans transition-colors ${
                    isDark 
                      ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-slate-600' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-500'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className={`block font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Applicable Fees</label>
                  <input
                    type="text"
                    value={fees}
                    onChange={(e) => setFees(e.target.value)}
                    placeholder="e.g. 500 INR"
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none transition-colors ${
                      isDark 
                        ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-slate-600' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-500'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Statutory Deadline</label>
                  <input
                    type="text"
                    value={deadlines}
                    onChange={(e) => setDeadlines(e.target.value)}
                    placeholder="e.g. 30 days from notice"
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none transition-colors ${
                      isDark 
                        ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-slate-600' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-500'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block font-medium mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Portal / Authority Registry</label>
                  <input
                    type="text"
                    value={portal}
                    onChange={(e) => setPortal(e.target.value)}
                    placeholder="e.g. District Rent Authority"
                    className={`w-full border rounded-md px-3 py-2 focus:outline-none transition-colors ${
                      isDark 
                        ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-slate-600' 
                        : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-500'
                    }`}
                  />
                </div>
              </div>

              <div className={`flex items-center justify-end space-x-3 pt-3 border-t ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className={`px-4 py-2 border rounded-md transition-colors ${
                    isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-750 border-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 text-white rounded-md flex items-center space-x-1.5 transition-colors ${
                    isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-slate-900 hover:bg-slate-800 shadow-xs'
                  }`}
                >
                  {saveSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Document Indexed</span>
                    </>
                  ) : (
                    <span>Save & Index Document</span>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
