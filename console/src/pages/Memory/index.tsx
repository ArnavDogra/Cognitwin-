import React, { useEffect, useState } from 'react';
import { Card, Typography, List, Tag, Layout, Input, Empty, Spin } from 'antd';
import { Brain, Coffee, Plane, Code, Briefcase, Search, FileText, User, ShoppingCart } from 'lucide-react';
import { workspaceApi } from '../../api/modules/workspace';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

interface MemoryItem {
  id: string;
  category: string;
  value: string;
  tag: string;
  icon: React.ReactNode;
}

const getCategoryIcon = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes('food') || cat.includes('drink') || cat.includes('preference')) return <Coffee size={18} />;
  if (cat.includes('travel') || cat.includes('flight')) return <Plane size={18} />;
  if (cat.includes('code') || cat.includes('dev') || cat.includes('project')) return <Code size={18} />;
  if (cat.includes('work') || cat.includes('job')) return <Briefcase size={18} />;
  if (cat.includes('shop') || cat.includes('buy')) return <ShoppingCart size={18} />;
  if (cat.includes('contact') || cat.includes('person')) return <User size={18} />;
  return <FileText size={18} />;
};

export default function MemoryPage() {
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchMemories() {
      try {
        setLoading(true);
        // Fetch core and digest memory files
        const [coreFiles, digestFiles] = await Promise.all([
          workspaceApi.listMemoryFiles('core').catch(() => []),
          workspaceApi.listMemoryFiles('digest').catch(() => [])
        ]);

        const allMemories: MemoryItem[] = [];
        
        for (const file of [...coreFiles, ...digestFiles]) {
          const isCore = coreFiles.includes(file);
          const category = file.name.replace('.md', '').replace(/_/g, ' ');
          
          try {
            const content = await workspaceApi.loadMemoryFile(file.path, isCore ? 'core' : 'digest');
            const lines = (content.content as string).split('\n').filter(l => l.trim().length > 0);
            
            if (lines.length > 0) {
                const previewLines = lines.slice(0, 3);
                for (const line of previewLines) {
                  let cleanLine = line.replace(/^[-*]\s*/, '').trim();
                  if (cleanLine && cleanLine.length > 3) {
                      allMemories.push({
                        id: file.path + '-' + Math.random(),
                        category: category.charAt(0).toUpperCase() + category.slice(1),
                        value: cleanLine,
                        tag: isCore ? 'Preference' : 'Fact',
                        icon: getCategoryIcon(category)
                      });
                  }
                }
            }
          } catch (e) {
            console.error('Failed to load memory file', file.path);
          }
        }
        setMemories(allMemories);
      } catch (err) {
        console.error('Failed to fetch memories', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchMemories();
  }, []);

  const filteredMemories = memories.filter(m => 
    m.category.toLowerCase().includes(search.toLowerCase()) || 
    m.value.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Content style={{ padding: '48px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Brain size={48} color="#5B5BD6" />
            <div>
            <Title level={2} style={{ margin: 0, fontWeight: 600 }}>Long-Term Memory</Title>
            <Paragraph type="secondary" style={{ margin: 0, fontSize: '16px' }}>
                Cognitwin remembers your preferences to personalize your experience.
            </Paragraph>
            </div>
        </div>
        <Input 
            prefix={<Search size={16} color="rgba(255,255,255,0.45)" />} 
            placeholder="Search memories..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '250px', borderRadius: '8px', background: 'var(--color-fill-tertiary, rgba(255,255,255,0.05))', border: '1px solid rgba(255,255,255,0.1)' }}
        />
      </div>

      <Card bordered={false} style={{ background: 'var(--ant-color-bg-container)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
        {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}><Spin size="large" /></div>
        ) : filteredMemories.length === 0 ? (
            <Empty description="No memories found." />
        ) : (
            <List
            itemLayout="horizontal"
            dataSource={filteredMemories}
            renderItem={(item) => (
                <List.Item style={{ padding: '24px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <List.Item.Meta
                    avatar={<div style={{ padding: '12px', background: 'rgba(91, 91, 214, 0.1)', borderRadius: '12px', color: '#5B5BD6', display: 'flex' }}>{item.icon}</div>}
                    title={<span style={{ fontSize: '16px', fontWeight: 600 }}>{item.category}</span>}
                    description={<span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.65)' }}>{item.value}</span>}
                />
                <Tag color={item.tag === 'Preference' ? '#5B5BD6' : '#22c55e'} style={{ borderRadius: '6px', padding: '4px 12px', border: 'none', background: 'rgba(255,255,255,0.1)' }}>
                    {item.tag}
                </Tag>
                </List.Item>
            )}
            />
        )}
      </Card>
    </Content>
  );
}
