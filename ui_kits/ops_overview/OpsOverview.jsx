/* PHIL Ops — Operations Overview.
   A general team-overview dashboard composed entirely from the PHIL DS components:
   KPI stat cards, a 7-day volume chart, status breakdown, an active-PA worklist table,
   and a live activity rail. Exposes window.OpsOverview. */
(function () {
  const NS = window.PHILDesignSystem_bffd2d;
  const { AppHeader, Card, KeyValue, Tag, StatusPill, ProgressBar,
          Button, CommentItem, Avatar, Icon } = NS;
  const { useState } = React;

  const SUB = 'var(--color-text-secondary)';
  const INK = 'var(--color-text-default)';
  const LABEL = {
    font: '700 12px var(--font-body)', letterSpacing: '.6px',
    textTransform: 'uppercase', color: SUB,
  };

  // ── KPI stat card ───────────────────────────────────────────────────
  function Stat({ label, value, unit, icon, trend, trendColor }) {
    return (
      <Card bodyStyle={{ gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={LABEL}>{label}</span>
          <span style={{
            width: 34, height: 34, borderRadius: 'var(--radius-md)',
            background: 'var(--color-brand-tint)', color: 'var(--color-brand)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Icon name={icon} size={18} />
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{ font: '800 34px var(--font-display)', color: INK, lineHeight: 1 }}>{value}</span>
          {unit && <span style={{ font: '500 14px var(--font-body)', color: SUB }}>{unit}</span>}
        </div>
        <Tag color={trendColor} size="sm">{trend}</Tag>
      </Card>
    );
  }

  // ── 7-day volume bar chart ──────────────────────────────────────────
  const VOLUME = [
    { d: 'Mon', started: 38, resolved: 31 },
    { d: 'Tue', started: 44, resolved: 40 },
    { d: 'Wed', started: 52, resolved: 47 },
    { d: 'Thu', started: 41, resolved: 45 },
    { d: 'Fri', started: 58, resolved: 49 },
    { d: 'Sat', started: 22, resolved: 24 },
    { d: 'Sun', started: 17, resolved: 19 },
  ];
  function VolumeChart() {
    const max = 60;
    const legend = (color, text) => (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: '500 13px var(--font-body)', color: SUB }}>
        <span style={{ width: 10, height: 10, borderRadius: 3, background: color }} />{text}
      </span>
    );
    return (
      <Card
        title="PA Volume — Last 7 Days"
        action={<div style={{ display: 'flex', gap: 16 }}>{legend('var(--blue-600)', 'Started')}{legend('var(--teal-300)', 'Resolved')}</div>}
        bodyStyle={{ gap: 18 }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${VOLUME.length}, 1fr)`, alignItems: 'end', gap: 14, height: 200, paddingTop: 8 }}>
          {VOLUME.map((row) => (
            <div key={row.d} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, height: '100%' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 5, width: '100%', justifyContent: 'center' }}>
                <div title={`Started ${row.started}`} style={{ width: 14, height: `${(row.started / max) * 100}%`, background: 'var(--blue-600)', borderRadius: '4px 4px 0 0', transition: 'height 240ms ease' }} />
                <div title={`Resolved ${row.resolved}`} style={{ width: 14, height: `${(row.resolved / max) * 100}%`, background: 'var(--teal-300)', borderRadius: '4px 4px 0 0', transition: 'height 240ms ease' }} />
              </div>
              <span style={{ font: '500 12px var(--font-ui)', color: SUB }}>{row.d}</span>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  // ── Status breakdown (segmented bar + legend) ───────────────────────
  const BREAKDOWN = [
    { label: 'Pending',  count: 128, color: 'var(--blue-600)',  status: 'pending' },
    { label: 'Approved', count: 96,  color: 'var(--green-600)', status: 'approved' },
    { label: 'Denied',   count: 34,  color: 'var(--red-500)',   status: 'denied' },
    { label: 'Expired',  count: 12,  color: 'var(--amber-600)', status: 'expired' },
  ];
  function StatusBreakdown() {
    const total = BREAKDOWN.reduce((s, b) => s + b.count, 0);
    return (
      <Card title="PA Status Breakdown" bodyStyle={{ gap: 18 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ font: '800 30px var(--font-display)', color: INK, lineHeight: 1 }}>{total}</span>
            <span style={{ font: '500 13px var(--font-body)', color: SUB }}>open authorizations</span>
          </div>
        </div>
        <div style={{ display: 'flex', height: 14, borderRadius: 'var(--radius-pill)', overflow: 'hidden', boxShadow: 'var(--shadow-inset-input)' }}>
          {BREAKDOWN.map((b) => (
            <div key={b.label} title={`${b.label}: ${b.count}`} style={{ width: `${(b.count / total) * 100}%`, background: b.color }} />
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {BREAKDOWN.map((b) => (
            <div key={b.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <StatusPill status={b.status} />
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ font: '700 15px var(--font-body)', color: INK }}>{b.count}</span>
                <span style={{ font: '400 12px var(--font-body)', color: SUB }}>{Math.round((b.count / total) * 100)}%</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  // ── Active PA worklist (table) ──────────────────────────────────────
  const ROWS = [
    { name: 'Patricia Tuladhar', order: '1853-6203-7047', drug: 'TYRVAYA 0.03MG',        carrier: 'United Healthcare CM', status: 'pending',  sla: 20, age: '1d', tone: 'blue' },
    { name: 'Marcus Whitfield',  order: '2041-7782-1190', drug: 'OZEMPIC 1MG',            carrier: 'Aetna',                status: 'pending',  sla: 60, age: '3d', tone: 'blue' },
    { name: 'Dolores Park',      order: '9920-1184-5521', drug: 'HUMIRA 40MG/0.4ML',      carrier: 'Cigna',                status: 'approved', sla: 100, age: '4d', tone: 'green' },
    { name: 'Henry Okafor',      order: '7731-9043-2208', drug: 'JARDIANCE 25MG',         carrier: 'Medicare Part D',      status: 'denied',   sla: 100, age: '5d', tone: 'red' },
    { name: 'Aiko Tanaka',       order: '6650-2231-9087', drug: 'DUPIXENT 300MG/2ML',     carrier: 'United Healthcare CM', status: 'expired',  sla: 100, age: '8d', tone: 'orange' },
    { name: 'Greg Salcedo',      order: '5512-8890-3344', drug: 'ELIQUIS 5MG',            carrier: 'Aetna',                status: 'pending',  sla: 40, age: '2d', tone: 'blue' },
  ];
  const SLA_COLOR = (v, status) => status === 'denied' || status === 'expired' ? 'var(--red-500)'
    : status === 'approved' ? 'var(--green-600)' : v > 70 ? 'var(--amber-600)' : 'var(--blue-600)';

  function Worklist() {
    const cols = '1.6fr 1.4fr 1.4fr 1fr 1fr 0.5fr';
    const head = ['Patient', 'Medication', 'Carrier', 'Status', 'SLA', 'Age'];
    return (
      <Card
        title="Active Prior Authorizations"
        action={<Button intent="secondary" size="sm" icon={<Icon name="search" size={15} />}>Filter</Button>}
        bodyStyle={{ gap: 0 }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 12, padding: '4px 0 12px', borderBottom: '1px solid var(--color-border-muted)' }}>
          {head.map((h) => <span key={h} style={LABEL}>{h}</span>)}
        </div>
        {ROWS.map((r) => (
          <div key={r.order} style={{ display: 'grid', gridTemplateColumns: cols, gap: 12, alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--color-border-muted)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
              <Avatar initials={r.name.split(' ').map((p) => p[0]).join('')} size={32} />
              <div style={{ minWidth: 0 }}>
                <div style={{ font: '700 14px var(--font-body)', color: INK, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.name}</div>
                <div style={{ font: '400 12px var(--font-body)', color: SUB }}>{r.order}</div>
              </div>
            </div>
            <span style={{ font: '700 13px var(--font-body)', color: 'var(--color-brand)' }}>{r.drug}</span>
            <span style={{ font: '400 14px var(--font-body)', color: INK }}>{r.carrier}</span>
            <StatusPill status={r.status} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <div style={{ height: 6, borderRadius: 'var(--radius-pill)', background: 'var(--neutral-200)', overflow: 'hidden' }}>
                <div style={{ width: `${r.sla}%`, height: '100%', background: SLA_COLOR(r.sla, r.status), borderRadius: 'var(--radius-pill)' }} />
              </div>
              <span style={{ font: '400 11px var(--font-body)', color: SUB }}>{r.sla}%</span>
            </div>
            <Tag color={r.tone} size="sm">{r.age}</Tag>
          </div>
        ))}
      </Card>
    );
  }

  // ── Activity rail ───────────────────────────────────────────────────
  const ACTIVITY = [
    { t: 'PA approved for Dolores Park — HUMIRA 40MG. CMM key: BY9YXEB7.', m: 'Today 11:42 AM EDT · PhilSystem' },
    { t: 'Start PA completed by RPA for Marcus Whitfield. Order put to sleep for 30 mins.', m: 'Today 11:05 AM EDT · RPA' },
    { t: 'Insurance exception reported by PP. Reason code: 75 - Prior Authorization Required.', m: 'Today 10:51 AM EDT · PhilSystem' },
    { t: 'Prescription transferred from Phil to Sterling Specialty Pharmacy.', m: 'Today 9:18 AM EDT · Emmanuel Abujan (Psup Agent)' },
    { t: 'PA for Henry Okafor denied by carrier. Appeal recommended.', m: 'Yesterday 4:30 PM EDT · CMM' },
  ];
  function ActivityRail() {
    return (
      <aside style={{ width: 360, flexShrink: 0, backgroundColor: 'var(--color-sidebar-bg)', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div style={{ padding: '24px 20px 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 40, height: 40, borderRadius: 8, background: 'var(--color-brand-deep)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <Icon name="bell" size={20} />
          </span>
          <span style={{ font: '700 18px var(--font-display)', color: 'rgb(25,28,29)' }}>Activity</span>
        </div>
        <div style={{ padding: '8px 16px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ACTIVITY.map((c, i) => <CommentItem key={i} meta={c.m}>{c.t}</CommentItem>)}
        </div>
      </aside>
    );
  }

  // ── Page ────────────────────────────────────────────────────────────
  function OpsOverview() {
    const [range, setRange] = useState('Today');
    return (
      <div style={{ minHeight: '100vh', background: 'var(--color-app-bg)', display: 'flex', flexDirection: 'column' }}>
        <AppHeader
          actions={[{ icon: 'search', label: 'Search' }, { icon: 'bell', label: 'Alerts' }]}
          user={{ initials: 'EA' }}
        />
        <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
          <main style={{ flex: 1, padding: 24, display: 'flex', flexDirection: 'column', gap: 20, overflowY: 'auto' }}>

            {/* Title row */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div>
                <h1 style={{ margin: 0, font: '800 28px var(--font-display)', color: 'var(--color-brand)' }}>Operations Overview</h1>
                <div style={{ marginTop: 4, font: '400 14px var(--font-body)', color: SUB }}>Prior-authorization team performance · Fri, Jun 20 2026</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ display: 'inline-flex', background: '#fff', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-card)', padding: 3 }}>
                  {['Today', 'Week', 'Month'].map((r) => (
                    <button key={r} onClick={() => setRange(r)} style={{
                      border: 'none', cursor: 'pointer', padding: '7px 14px', borderRadius: 6,
                      font: '500 13px var(--font-ui)',
                      background: range === r ? 'var(--color-brand)' : 'transparent',
                      color: range === r ? '#fff' : 'var(--neutral-700)',
                      transition: 'background 120ms ease',
                    }}>{r}</button>
                  ))}
                </div>
                <Button intent="primary" size="md" icon={<Icon name="plus" size={16} />}>Start Prior Authorization</Button>
              </div>
            </div>

            {/* KPI row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              <Stat label="Open PAs"        value="270" icon="list-checks"  trend="+12 vs yesterday" trendColor="blue" />
              <Stat label="Approved Today"  value="48"  icon="check-circle" trend="+8% approval rate" trendColor="green" />
              <Stat label="Avg Turnaround"  value="2.4" unit="days" icon="clock" trend="−0.3d this week" trendColor="green" />
              <Stat label="SLA Breaches"    value="6"   icon="alert-circle" trend="3 due in 24h" trendColor="red" />
            </div>

            {/* Charts row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20, alignItems: 'start' }}>
              <VolumeChart />
              <StatusBreakdown />
            </div>

            {/* Worklist */}
            <Worklist />
          </main>
          <ActivityRail />
        </div>
      </div>
    );
  }

  window.OpsOverview = OpsOverview;
})();
