import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { initialDocuments } from '@/services/mockData';
import { FileText, Save, Plus, Clock, FolderOpen } from 'lucide-react';
import { toast } from 'sonner';
import type { DocItem } from '@/types';

export default function Documentation() {
  const [docs, setDocs] = useState<DocItem[]>(initialDocuments);
  const [activeId, setActiveId] = useState(docs[0]?.id || '');
  const [editContent, setEditContent] = useState(docs[0]?.content || '');

  const activeDoc = docs.find(d => d.id === activeId);
  const folders = [...new Set(docs.map(d => d.folder))];

  const selectDoc = (id: string) => {
    setActiveId(id);
    setEditContent(docs.find(d => d.id === id)?.content || '');
  };

  const saveDoc = () => {
    setDocs(prev => prev.map(d => d.id === activeId ? { ...d, content: editContent, updatedAt: new Date().toISOString().split('T')[0], versions: d.versions + 1 } : d));
    toast.success('Document saved!');
  };

  const addDoc = () => {
    const newDoc: DocItem = { id: Date.now().toString(), title: 'Untitled Document', folder: 'General', content: '# New Document\n\nStart writing here...', updatedAt: new Date().toISOString().split('T')[0], versions: 1 };
    setDocs(prev => [newDoc, ...prev]);
    selectDoc(newDoc.id);
    toast.success('New document created!');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Documentation</h1>
          <p className="text-muted-foreground">Your markdown workspace</p>
        </div>
        <Button variant="glow" className="gap-2" onClick={addDoc}><Plus className="h-4 w-4" /> New Document</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Documents</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {folders.map(folder => (
              <div key={folder}>
                <div className="flex items-center gap-2 mb-2">
                  <FolderOpen className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase">{folder}</span>
                </div>
                <div className="space-y-1 ml-2">
                  {docs.filter(d => d.folder === folder).map(d => (
                    <button key={d.id} onClick={() => selectDoc(d.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${d.id === activeId ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-accent'}`}>
                      <FileText className="h-4 w-4 shrink-0" />
                      <span className="truncate">{d.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <Input value={activeDoc?.title || ''} onChange={e => setDocs(prev => prev.map(d => d.id === activeId ? { ...d, title: e.target.value } : d))}
              className="text-lg font-semibold border-none p-0 h-auto focus-visible:ring-0 bg-transparent" />
            <Button variant="glow" size="sm" className="gap-2 shrink-0" onClick={saveDoc}><Save className="h-4 w-4" /> Save</Button>
          </CardHeader>
          <CardContent>
            <Textarea value={editContent} onChange={e => setEditContent(e.target.value)} className="min-h-[400px] font-mono text-sm resize-none" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Version History</CardTitle></CardHeader>
          <CardContent>
            {activeDoc && (
              <div className="space-y-3">
                {Array.from({ length: activeDoc.versions }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent transition-colors">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Version {activeDoc.versions - i}</p>
                      <p className="text-xs text-muted-foreground">{i === 0 ? 'Current' : `${i} revision${i > 1 ? 's' : ''} ago`}</p>
                    </div>
                    {i === 0 && <Badge variant="secondary" className="text-xs ml-auto">Latest</Badge>}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
