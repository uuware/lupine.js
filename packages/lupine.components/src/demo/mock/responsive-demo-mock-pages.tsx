import {
  FloatingIconMenu,
  floatingIconMenuMainBtnMock,
  floatingIconMenuOptionsMock,
} from '../../component-pool/floating-icon-menu';

export const HomePage = () => {
  return (
    <div style={{ padding: '16px' }}>
      <div
        style={{
          backgroundColor: 'var(--primary-color, #1890ff)',
          color: 'white',
          padding: '24px',
          borderRadius: '12px',
          marginBottom: '20px',
        }}
      >
        <h2 style={{ margin: 0, fontSize: '24px' }}>Welcome Back!</h2>
        <p style={{ marginTop: '8px', opacity: 0.8 }}>Explore the latest features in Lupine.js</p>
      </div>

      <h3 style={{ marginBottom: '12px' }}>Recent Activity</h3>
      <div
        style={{
          backgroundColor: 'var(--primary-bg-color, white)',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--primary-border, #eee)',
        }}
      >
        {[1, 2, 3].map((i) => (
          <div
            class='row-box'
            style={{ padding: '16px', borderBottom: i < 3 ? '1px solid var(--primary-border, #eee)' : 'none' }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-color, #1890ff)',
                opacity: 0.1,
                marginRight: '16px',
              }}
            ></div>
            <div class='col'>
              <div style={{ fontWeight: 'bold' }}>Activity Item {i}</div>
              <div style={{ fontSize: '12px', color: 'var(--secondary-text-color, #666)', marginTop: '4px' }}>
                Just now
              </div>
            </div>
          </div>
        ))}
      </div>

      <FloatingIconMenu mainIcon={floatingIconMenuMainBtnMock} items={floatingIconMenuOptionsMock} bottom='75px' />
    </div>
  );
};

export const CustomerPage = () => {
  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h2 style={{ marginBottom: '20px' }}>Customer Service</h2>

      <div
        class='col'
        style={{
          backgroundColor: 'var(--primary-bg-color, #f9f9f9)',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
          overflowY: 'auto',
          border: '1px solid var(--primary-border, #eee)',
        }}
      >
        <div class='row-box' style={{ marginBottom: '16px' }}>
          <div
            style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#eee', marginRight: '12px' }}
          ></div>
          <div
            style={{
              backgroundColor: 'white',
              padding: '12px',
              borderRadius: '0 12px 12px 12px',
              border: '1px solid var(--primary-border, #eee)',
            }}
          >
            Hello! How can I help you today?
          </div>
        </div>
        <div class='row-box' style={{ marginBottom: '16px', justifyContent: 'flex-end' }}>
          <div
            style={{
              backgroundColor: 'var(--primary-color, #1890ff)',
              color: 'white',
              padding: '12px',
              borderRadius: '12px 0 12px 12px',
            }}
          >
            I have a question about my recent order.
          </div>
        </div>
      </div>

      <div
        class='row-box'
        style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          padding: '4px 4px 4px 16px',
          border: '1px solid var(--primary-border, #eee)',
        }}
      >
        <input
          type='text'
          placeholder='Type a message...'
          style={{ border: 'none', background: 'transparent', outline: 'none', flex: 1 }}
        />
        <div
          style={{
            backgroundColor: 'var(--primary-color, #1890ff)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            cursor: 'pointer',
          }}
        >
          Send
        </div>
      </div>
    </div>
  );
};

export const MemberPage = () => {
  return (
    <div style={{ padding: '16px' }}>
      <div
        class='row-box'
        style={{
          backgroundColor: 'var(--primary-bg-color, white)',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid var(--primary-border, #eee)',
          marginBottom: '20px',
        }}
      >
        <div
          style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#eee', marginRight: '16px' }}
        ></div>
        <div class='col'>
          <h2 style={{ margin: 0 }}>John Doe</h2>
          <div style={{ color: 'var(--secondary-color, #faad14)', fontSize: '14px', marginTop: '4px' }}>
            VIP Member Status
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: '12px' }}>Membership Privileges</h3>
      <div
        style={{
          backgroundColor: 'var(--primary-bg-color, white)',
          borderRadius: '12px',
          overflow: 'hidden',
          border: '1px solid var(--primary-border, #eee)',
        }}
      >
        {['Exclusive Content', 'Priority Support', 'Early Access', 'Ad-Free Experience'].map((privilege, i) => (
          <div
            class='row-box'
            style={{ padding: '16px', borderBottom: i < 3 ? '1px solid var(--primary-border, #eee)' : 'none' }}
          >
            <i
              class='ifc-icon ma-crown-outline'
              style={{ color: 'var(--secondary-color, #faad14)', marginRight: '16px', fontSize: '20px' }}
            ></i>
            <div class='col'>{privilege}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
