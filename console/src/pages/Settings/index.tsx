import React from 'react';
import { Card, Typography, Layout, Form, Switch, Input, Button, Divider } from 'antd';
import { Settings, Palette, Brain, Key, Globe, Terminal } from 'lucide-react';

const { Title, Paragraph } = Typography;
const { Content } = Layout;

export default function SettingsPage() {
  return (
    <Content style={{ padding: '48px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
        <Settings size={48} color="#5B5BD6" />
        <div>
          <Title level={2} style={{ margin: 0, fontWeight: 600 }}>Settings</Title>
          <Paragraph type="secondary" style={{ margin: 0, fontSize: '16px' }}>
            Configure Cognitwin to your exact preferences.
          </Paragraph>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <Card bordered={false} style={{ background: 'var(--ant-color-bg-container)', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Palette size={20} color="#5B5BD6" />
            <Title level={4} style={{ margin: 0 }}>Appearance</Title>
          </div>
          <Form layout="vertical">
            <Form.Item label="Theme" tooltip="Force Dark, Light, or System default">
              <Switch checkedChildren="Dark" unCheckedChildren="Light" defaultChecked />
            </Form.Item>
          </Form>
        </Card>

        <Card bordered={false} style={{ background: 'var(--ant-color-bg-container)', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Key size={20} color="#5B5BD6" />
            <Title level={4} style={{ margin: 0 }}>Gemini Configuration</Title>
          </div>
          <Paragraph style={{ color: 'rgba(255,255,255,0.65)' }}>Configure the primary AI model backend.</Paragraph>
          <Form layout="vertical">
            <Form.Item label="GEMINI_API_KEY">
              <Input.Password placeholder="AIzaSy..." />
            </Form.Item>
            <Form.Item label="Model">
              <Input defaultValue="gemini-2.0-flash" />
            </Form.Item>
            <Form.Item label="Temperature">
              <Input type="number" defaultValue="0.7" />
            </Form.Item>
            <Button type="primary" style={{ background: '#5B5BD6', borderColor: '#5B5BD6', borderRadius: '8px' }}>Save Configuration</Button>
          </Form>
        </Card>

        <Card bordered={false} style={{ background: 'var(--ant-color-bg-container)', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Brain size={20} color="#5B5BD6" />
            <Title level={4} style={{ margin: 0 }}>Memory</Title>
          </div>
          <Form layout="vertical">
            <Form.Item label="Auto Memory Search" tooltip="Automatically retrieve context from ReMe">
              <Switch defaultChecked />
            </Form.Item>
          </Form>
        </Card>

        <Card bordered={false} style={{ background: 'var(--ant-color-bg-container)', borderRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Globe size={20} color="#5B5BD6" />
            <Title level={4} style={{ margin: 0 }}>Browser Sessions</Title>
          </div>
          <Paragraph style={{ color: 'rgba(255,255,255,0.65)' }}>Manage persistent browser cookies and local storage for automated sessions.</Paragraph>
          <Button>Clear All Session Data</Button>
        </Card>

        <Card bordered={false} style={{ background: 'var(--ant-color-bg-container)', borderRadius: '16px', border: '1px solid rgba(255,0,0,0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Terminal size={20} color="#ef4444" />
            <Title level={4} style={{ margin: 0 }}>Developer Mode</Title>
          </div>
          <Paragraph style={{ color: 'rgba(255,255,255,0.65)' }}>Enable advanced routing, debugging, and admin controls.</Paragraph>
          <Form layout="vertical">
            <Form.Item>
              <Switch unCheckedChildren="Disabled" checkedChildren="Enabled" />
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Content>
  );
}
