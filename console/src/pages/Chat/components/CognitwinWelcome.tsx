import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import { Globe, Brain, FileText, Code, ShoppingCart, Mail, Calendar } from 'lucide-react';

const { Title, Paragraph } = Typography;

const CAPABILITIES = [
  {
    title: 'Browse the Web',
    prompt: 'Open a browser and search for the latest news on AI.',
    icon: <Globe size={20} color="#5B5BD6" />
  },
  {
    title: 'Remember Something',
    prompt: 'Can you remember that my favorite color is #5B5BD6?',
    icon: <Brain size={20} color="#7C3AED" />
  },
  {
    title: 'Summarize a PDF',
    prompt: 'Help me summarize a PDF document.',
    icon: <FileText size={20} color="#f59e0b" />
  },
  {
    title: 'Help Me Code',
    prompt: 'Write a python script that fetches the top posts from HackerNews.',
    icon: <Code size={20} color="#22c55e" />
  },
  {
    title: 'Shop Online',
    prompt: 'Go to Amazon and look for a mechanical keyboard under $100.',
    icon: <ShoppingCart size={20} color="#ec4899" />
  },
  {
    title: 'Read Gmail',
    prompt: 'Can you check my Gmail for any unread emails?',
    icon: <Mail size={20} color="#3b82f6" />
  },
  {
    title: 'Plan My Day',
    prompt: 'Help me plan my schedule for today.',
    icon: <Calendar size={20} color="#14b8a6" />
  }
];

export function CognitwinWelcome({ onPromptClick }: { onPromptClick?: (text: string) => void }) {
  return (
    <div style={{ padding: '80px 24px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ marginBottom: '60px' }}>
        <Title level={4} style={{ color: '#5B5BD6', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px', fontSize: '14px', fontWeight: 600 }}>
          COGNITWIN
        </Title>
        <Title level={1} style={{ fontSize: '42px', fontWeight: 600, marginBottom: '24px', letterSpacing: '-0.5px' }}>
          Personal AI Operating System
        </Title>
        <Paragraph style={{ fontSize: '20px', color: 'var(--text-secondary, rgba(255,255,255,0.55))', fontWeight: 300, letterSpacing: '0.5px' }}>
          Remembers. Browses. Automates. Learns.
        </Paragraph>
      </div>

      <Row gutter={[16, 16]} justify="center">
        {CAPABILITIES.map((cap, i) => (
          <Col xs={24} sm={12} md={8} key={i}>
            <Card
              bordered={false}
              hoverable
              onClick={() => onPromptClick?.(cap.prompt)}
              style={{
                background: 'var(--color-fill-tertiary, rgba(255, 255, 255, 0.02))',
                borderRadius: '16px',
                textAlign: 'left',
                height: '100%',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
              bodyStyle={{ padding: '20px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex' }}>
                  {cap.icon}
                </div>
                <Title level={5} style={{ margin: 0, fontSize: '15px', fontWeight: 500 }}>
                  {cap.title}
                </Title>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
