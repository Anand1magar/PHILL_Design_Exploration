/* Shared components for PADashboard and StartPAFlow.
   Putting these here avoids circular imports. */
import React, { useState, useRef, useEffect } from 'react';
import editDocIconRaw   from '../../assets/Icons/edit-document.svg?raw';
import rotateIconRaw    from '../../assets/Icons/rotate.svg?raw';
import insuranceCardImg from '../../assets/images/insurance-card.png';
import { Card }     from '../../components/layout/Card.jsx';
import { KeyValue } from '../../components/layout/KeyValue.jsx';
import { Tag }      from '../../components/core/Tag.jsx';
import { Button }   from '../../components/core/Button.jsx';
import { Icon }     from '../../components/core/Icon.jsx';
import { Select }   from '../../components/forms/Select.jsx';

// ── Field styles (Figma exact) ────────────────────────────────────
export const FIELD_INPUT = {
  width: '100%', border: 'none', outline: 'none', background: 'transparent',
  fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 14,
  lineHeight: '20px', color: 'var(--color-text-default)',
};
export const FIELD_BOX = {
  background: 'var(--color-surface-default)', border: '1px solid var(--color-border-muted)',
  borderRadius: 8, padding: '13px 17px', boxShadow: 'var(--shadow-xs)',
};
export const FIELD_LABEL = {
  fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14,
  lineHeight: '20px', color: 'var(--neutral-600)',
};

export function DrawerField({ label, value, onChange }) {
  return (
    <div style={{ paddingBottom: 24 }}>
      <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={FIELD_LABEL}>{label}</span>
        <div style={FIELD_BOX}>
          <input value={value} onChange={onChange} style={FIELD_INPUT} />
        </div>
      </label>
    </div>
  );
}

// ── Insurance card lightbox ───────────────────────────────────────
export function InsuranceCardModal({ open, onClose }) {
  const [zoom, setZoom]     = useState(1);
  const [rotate, setRotate] = useState(0);
  const [pos, setPos]       = useState({ x: 0, y: 0 });
  const stageRef   = useRef(null);
  const dragging   = useRef(false);
  const dragOrigin = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.12 : -0.12;
      setZoom((z) => +(Math.min(Math.max(z + delta, 0.25), 5)).toFixed(2));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [open]);

  useEffect(() => {
    if (!open) { setZoom(1); setRotate(0); setPos({ x: 0, y: 0 }); }
  }, [open]);

  const zoomIn    = () => setZoom((z) => +(Math.min(z + 0.25, 5)).toFixed(2));
  const zoomOut   = () => setZoom((z) => +(Math.max(z - 0.25, 0.25)).toFixed(2));
  const rotateCw  = () => setRotate((r) => (r + 90) % 360);
  const rotateCcw = () => setRotate((r) => (r - 90 + 360) % 360);
  const reset     = () => { setZoom(1); setRotate(0); setPos({ x: 0, y: 0 }); };

  const onMouseDown = (e) => {
    e.preventDefault(); dragging.current = true;
    dragOrigin.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
  };
  const onMouseMove = (e) => {
    if (!dragging.current) return;
    setPos({ x: e.clientX - dragOrigin.current.x, y: e.clientY - dragOrigin.current.y });
  };
  const onMouseUp = () => { dragging.current = false; };

  const CTRL_BTN = {
    width: 36, height: 36, borderRadius: 8, border: 'none', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    background: 'color-mix(in srgb, var(--neutral-0) 12%, transparent)',
    color: 'var(--color-text-inverse)', transition: 'background 150ms ease',
  };

  return (
    <div ref={stageRef} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 250ms ease', userSelect: 'none',
      }}>
      <div onClick={onClose} style={{
        position: 'absolute', inset: 0,
        background: 'color-mix(in srgb, var(--neutral-1000) 85%, transparent)',
        backdropFilter: 'blur(6px)',
      }} />
      <div style={{
        position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
        transform: open ? 'scale(1) translateY(0)' : 'scale(0.88) translateY(16px)',
        transition: open ? 'transform 320ms cubic-bezier(0.34, 1.4, 0.64, 1)' : 'none',
      }}>
        <div onMouseDown={onMouseDown} style={{
          width: '80vw', height: '65vh', borderRadius: 12, overflow: 'hidden',
          boxShadow: `0 24px 64px color-mix(in srgb, var(--neutral-1000) 60%, transparent)`,
          cursor: dragging.current ? 'grabbing' : 'grab',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img src={insuranceCardImg} alt="Insurance card" draggable={false}
            style={{
              display: 'block', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', flexShrink: 0,
              transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom}) rotate(${rotate}deg)`,
              transition: dragging.current ? 'none' : 'transform 200ms ease',
              transformOrigin: 'center center',
            }} />
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'color-mix(in srgb, var(--neutral-0) 10%, transparent)',
          backdropFilter: 'blur(12px)',
          border: '1px solid color-mix(in srgb, var(--neutral-0) 15%, transparent)',
          borderRadius: 12, padding: '8px 14px',
        }}>
          <button style={CTRL_BTN} onClick={zoomOut}><Icon name="minus" size={16} color="var(--color-text-inverse)" /></button>
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, color: 'var(--color-text-inverse)', minWidth: 44, textAlign: 'center' }}>{Math.round(zoom * 100)}%</span>
          <button style={CTRL_BTN} onClick={zoomIn}><Icon name="plus" size={16} color="var(--color-text-inverse)" /></button>
          <div style={{ width: 1, height: 20, background: 'color-mix(in srgb, var(--neutral-0) 20%, transparent)', margin: '0 4px' }} />
          <button style={CTRL_BTN} onClick={rotateCcw}><span dangerouslySetInnerHTML={{ __html: rotateIconRaw }} style={{ display: 'inline-flex', width: 16, height: 16, transform: 'scaleX(-1)', filter: 'invert(1)' }} /></button>
          <button style={CTRL_BTN} onClick={rotateCw}><span dangerouslySetInnerHTML={{ __html: rotateIconRaw }} style={{ display: 'inline-flex', width: 16, height: 16, filter: 'invert(1)' }} /></button>
          <div style={{ width: 1, height: 20, background: 'color-mix(in srgb, var(--neutral-0) 20%, transparent)', margin: '0 4px' }} />
          <button style={{ ...CTRL_BTN, fontSize: 12, fontFamily: 'var(--font-body)', fontWeight: 600, width: 'auto', padding: '0 10px' }} onClick={reset}>Reset</button>
        </div>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'color-mix(in srgb, var(--neutral-0) 45%, transparent)' }}>Click outside to close</span>
      </div>
    </div>
  );
}

// ── Edit Insurance Drawer ─────────────────────────────────────────
export function EditInsuranceDrawer({ open, onClose }) {
  const [cardModal, setCardModal] = useState(false);
  const [form, setForm] = useState({
    carrier: 'United Healthcare CM', memberId: 'U88294022',
    groupId: 'NYFED-02', bin: '610014', pcn: 'MEDDPRIME', type: 'Commercial',
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'color-mix(in srgb, var(--neutral-1000) 30%, transparent)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 250ms ease', zIndex: 200,
      }} />
      <InsuranceCardModal open={cardModal} onClose={() => setCardModal(false)} />
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 397,
        background: 'var(--color-sidebar-bg)', zIndex: 201, overflowY: 'auto',
        boxShadow: `-4px 0 24px color-mix(in srgb, var(--neutral-1000) 12%, transparent)`,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 280ms cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex', flexDirection: 'column', paddingTop: 24,
      }}>
        <div style={{ padding: '0 24px 32px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, flexShrink: 0, background: 'var(--blue-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span dangerouslySetInnerHTML={{ __html: editDocIconRaw }} style={{ display: 'inline-flex', width: 20, height: 20 }} />
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--color-text-default)' }}>Edit Insurance</div>
        </div>

        <div style={{ padding: '0 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <div onClick={() => setCardModal(true)} style={{ height: 226, width: '100%', overflow: 'hidden', position: 'relative', background: 'color-mix(in srgb, var(--neutral-400) 20%, transparent)', cursor: 'zoom-in' }}>
              <img src={insuranceCardImg} alt="Insurance card"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 200ms ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <DrawerField label="Primary Carrier" value={form.carrier} onChange={set('carrier')} />
            <DrawerField label="Member ID"       value={form.memberId} onChange={set('memberId')} />
            <DrawerField label="Group ID"        value={form.groupId}  onChange={set('groupId')} />
            <DrawerField label="BIN"             value={form.bin}      onChange={set('bin')} />
            <DrawerField label="PCN"             value={form.pcn}      onChange={set('pcn')} />
            <div style={{ paddingBottom: 24 }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={FIELD_LABEL}>Type</span>
                <div style={{ ...FIELD_BOX, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <select value={form.type} onChange={set('type')} style={{ ...FIELD_INPUT, appearance: 'none', cursor: 'pointer' }}>
                    {['Commercial', 'Medicare Part D', 'Medicaid', 'Tricare'].map((o) => <option key={o}>{o}</option>)}
                  </select>
                  <Icon name="chevron-down" size={16} color="var(--neutral-600)" style={{ flexShrink: 0, pointerEvents: 'none' }} />
                </div>
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 8, paddingBottom: 32 }}>
            <Button intent="primary" size="lg" fullWidth onClick={onClose}>Save</Button>
            <Button intent="link" size="lg" onClick={onClose} style={{ alignSelf: 'center', color: 'var(--neutral-700)' }}>Close</Button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Detail cards row (identical in both pages) ────────────────────
export function DetailRow() {
  const [insuranceEditOpen, setInsuranceEditOpen] = useState(false);
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        <Card title="Patient Profile" onCopy={() => {}}>
          <KeyValue label="Legal Name" value="Patricia Tuladhar" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <KeyValue label="Allergies" value="Cetirizine" valueColor="var(--color-text-danger)" />
            <KeyValue label="DOB" value="02/18/1978" />
          </div>
          <KeyValue label="Address" value={"1294 Evergreen Terrace, Apt 4B\nNew York, NY 10012"} />
          <Button intent="link" size="sm" onClick={() => {}} style={{ alignSelf: 'flex-start' }}>EDIT</Button>
        </Card>

        <Card title="Insurance Details (1)" onCopy={() => {}}>
          <Tag color="blue">Primary Insurance</Tag>
          <KeyValue label="Primary Carrier" value="United Healthcare CM" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <KeyValue label="Member ID" value="U88294022" />
            <KeyValue label="Group" value="NYFED-02" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <KeyValue label="BIN" value="610014" />
            <KeyValue label="PCN" value="MEDDPRIME" />
            <KeyValue label="Type" value="Commercial" />
          </div>
          <Button intent="link" size="sm" onClick={() => setInsuranceEditOpen(true)} style={{ alignSelf: 'flex-start' }}>EDIT</Button>
        </Card>

        <Card title="Doctor Information" onCopy={() => {}}>
          <KeyValue label="Full Name" value="Dr. Marc James" />
          <KeyValue label="Practice Name" value="Skin Expert MD" />
          <KeyValue label="Contact" value="(212) 555-0192 · Fax (212) 555-0193" />
          <Tag color="green" icon={<Icon name="check" size={10} />}>NPI Verified: 1942820011</Tag>
          <Button intent="link" size="sm" onClick={() => {}} style={{ alignSelf: 'flex-start' }}>EDIT</Button>
        </Card>
      </div>
      <EditInsuranceDrawer open={insuranceEditOpen} onClose={() => setInsuranceEditOpen(false)} />
    </>
  );
}
