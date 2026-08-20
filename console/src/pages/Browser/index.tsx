import React, { useEffect, useState } from 'react';
import { Card, Typography, Layout, Row, Col, Progress, Badge, Spin, Empty } from 'antd';
import { Globe, Lock, ShieldCheck, Chrome } from 'lucide-react';
import { toolsApi } from '../../api/modules/tools';
import type { ToolInfo } from '../../api/modules/tools';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

export default function BrowserPage() {
  const [loading, setLoading] = useState(true);
  const [playwrightTool, setPlaywrightTool] = useState<ToolInfo | null>(null);

  useEffect(() => {
    async function fetchStatus() {
      try {
        setLoading(true);
        const tools = await toolsApi.listTools();
        const pw = tools.find(t => t.name.toLowerCase().includes('playwright') || t.name.toLowerCase().includes('browser'));
        setPlaywrightTool(pw || null);
      } catch (err) {
        console.error('Failed to fetch browser engine status', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStatus();
  }, []);

  return (
    <Content style={{ padding: '48px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
        <Chrome size={48} color="#5B5BD6" />
        <div>
          <Title level={2} style={{ margin: 0, fontWeight: 600 }}>Cognitive Browser</Title>
          <Paragraph type="secondary" style={{ margin: 0, fontSize: '16px' }}>
            Monitor and manage your active browser automation sessions.
          </Paragraph>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        <Col span={16}>
          <Card bordered={false} style={{ background: 'var(--ant-color-bg-container)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', height: '100%' }}>
            <Title level={4} style={{ marginBottom: '24px' }}>Active Sessions</Title>
            
            <div style={{ padding: '40px 0', textAlign: 'center' }}>
                <Empty description="No active browser sessions." />
            </div>
          </Card>
        </Col>
        
        <Col span={8}>
          <Card bordered={false} style={{ background: 'var(--ant-color-bg-container)', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', height: '100%' }}>
            <Title level={4} style={{ marginBottom: '32px' }}>Playwright Engine</Title>
            {loading ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}><Spin size="large" /></div>
            ) : (
                <div style={{ textAlign: 'center' }}>
                <Progress 
                    type="dashboard" 
                    percent={playwrightTool?.enabled !== false ? 100 : 0} 
                    strokeColor={playwrightTool?.enabled !== false ? "#5B5BD6" : "#ff4d4f"} 
                    format={() => playwrightTool?.enabled !== false ? 'Ready' : 'Offline'} 
                />
                <Paragraph style={{ marginTop: '24px', color: 'rgba(255,255,255,0.65)' }}>
                    Browser automation engine is {playwrightTool?.enabled !== false ? 'online and ready for tasks.' : 'offline or unavailable.'}
                </Paragraph>
                </div>
            )}
          </Card>
        </Col>
      </Row>
    </Content>
  );
}
