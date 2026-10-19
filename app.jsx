const { useState, useEffect, useRef } = React;
const { ConfigProvider, Form, Input, Button, Checkbox, Tabs, Modal, message, theme } = antd;

const designs = [
  { id: '01', name: '云端商务', en: 'Cloud blue', kind: 'cloud', color: '#245de8', bg: '#eff4ff', tags: ['经典 Pro', '浅蓝', '企业级'], headline: ['每一次经营，', '都有清晰方向。'], sub: '让商品、订单与客户，在同一处有序协作。', caption: '清晰的秩序，让业务自然生长。', layout: '浅蓝品牌画布 / 白色登录面板' },
  { id: '02', name: '极简留白', en: 'Quiet white', kind: 'minimal', color: '#20252a', bg: '#f7f7f5', tags: ['极简', '黑白', '大留白'], headline: ['少一点繁杂，', '多一点专注。'], sub: '专注你的业务，其余的交给 Jasper。', caption: '为专注而设计。', layout: '纯白空间 / 大字排版 / 细线分区' },
  { id: '03', name: '深空控制台', en: 'Deep space', kind: 'space', color: '#56c8eb', bg: '#0b1830', dark: true, tags: ['深色', '科技', '轨道'], headline: ['连接每个节点，', '掌握业务全貌。'], sub: '你的经营世界，在此连接。', caption: '一处连接，全局可见。', layout: '深蓝夜幕 / 星轨装置 / 暗色表单' },
  { id: '04', name: '东方青玉', en: 'Jade landscape', kind: 'jade', color: '#2c7667', bg: '#eff4ee', tags: ['东方', '青绿', '山水'], headline: ['从容有序，', '生意自有生机。'], sub: '在变化的日常里，建立稳健的经营节奏。', caption: '以从容，见长远。', layout: '青玉山水 / 宋体标题 / 温润留白' },
  { id: '05', name: '活力橙光', en: 'Commerce orange', kind: 'orange', color: '#dc4b22', bg: '#fff3e7', tags: ['零售', '活力', '几何'], headline: ['好生意，', '即刻发生。'], sub: '从第一件商品，到下一次增长。', caption: '把灵感，变成下一笔生意。', layout: '橙色品牌面 / 立体货箱 / 高对比按钮' },
  { id: '06', name: '流光玻璃', en: 'Lavender glass', kind: 'glass', color: '#7756ce', bg: '#eee9fb', tags: ['通透', '柔紫', '玻璃'], headline: ['轻盈协作，', '让灵感落地。'], sub: '让每个好想法，都拥有流畅的开始。', caption: '轻一点，走得更远。', layout: '柔紫光晕 / 磨砂卡片 / 半透明层次' },
  { id: '07', name: '瑞士红白', en: 'Swiss red', kind: 'swiss', color: '#d92e2e', bg: '#f3f1ec', tags: ['现代', '红白', '网格'], headline: ['经营。', '井然有序。'], sub: '秩序是一切效率的开始。', caption: '清楚。直接。有效。', layout: '朱红版面 / 强字重 / 方角结构' },
  { id: '08', name: '曜石鎏金', en: 'Obsidian gold', kind: 'gold', color: '#d3b67a', bg: '#171c22', dark: true, tags: ['精品', '深色', '金属'], headline: ['每一份用心，', '都值得被成就。'], sub: '为注重品质的经营者，打造专属工作空间。', caption: '细节之上，自见品质。', layout: '曜石底色 / 金色拱门 / 精细边线' },
  { id: '09', name: '蓝图秩序', en: 'Blueprint', kind: 'blueprint', color: '#185cc5', bg: '#e9f0fa', tags: ['理性', '工程', '蓝图'], headline: ['从构想到运营，', '每一步皆有章法。'], sub: '用系统化的方式，构建可持续的业务。', caption: '把复杂，交给系统。', layout: '工程网格 / 线框空间 / 工具式表单' },
  { id: '10', name: '柔和杏桃', en: 'Peach morning', kind: 'peach', color: '#b95263', bg: '#fbeded', tags: ['温暖', '亲和', '柔和'], headline: ['新的一天，', '从美好开始。'], sub: '照顾好每一位客户，也照顾好你的日常。', caption: '让日常经营，多一点温度。', layout: '杏桃晨光 / 柔软曲面 / 亲和表单' },
];

function Icon({ name, size = 18 }) {
  const paths = {
    user: <><circle cx="12" cy="8" r="3.5"/><path d="M5 21v-2a7 7 0 0 1 14 0v2"/></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 15v2"/></>,
    phone: <><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M10 18h4"/></>,
    shield: <><path d="m12 2 8 3v6c0 5-4 9-8 11-4-2-8-6-8-11V5Z"/><path d="m8 12 3 3 5-6"/></>,
    arrow: <><path d="M4 12h16m-6-6 6 6-6 6"/></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    left: <path d="m14 5-7 7 7 7"/>, right: <path d="m10 5 7 7-7 7"/>,
    check: <path d="m5 12 4 4L19 6"/>,
    close: <path d="m6 6 12 12M6 18 18 6"/>,
    chat: <><path d="M21 11a8 8 0 0 1-9 8l-5 3v-4a8 8 0 1 1 14-7Z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></>,
    building: <><path d="M4 21V5l8-3v19M12 8h8v13M2 21h20M8 7v1m0 3v1m0 3v1m8-4v1m0 3v1"/></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{paths[name] || paths.grid}</svg>;
}

function Brand({ compact = false }) {
  return <div className={`brand ${compact ? 'compact' : ''}`}><span className="brand-mark"><svg width="25" height="27" viewBox="0 0 25 27" fill="none" aria-hidden="true"><path d="M17 3v13c0 5-3 8-8 8-3 0-5-1-7-3l4-4c1 1 2 2 3 2 2 0 3-1 3-4V3Z" fill="currentColor"/><path d="M21 3h4v5h-4z" fill="currentColor" opacity=".45"/></svg></span><span>Jasper<span className="brand-dot">.</span></span>{!compact && <span className="brand-product">商城管理平台</span>}</div>;
}

function Art({ kind }) {
  return <div className={`art art-${kind}`} aria-hidden="true">
    {kind === 'cloud' && <><div className="cloud-ring ring-one"/><div className="cloud-ring ring-two"/><div className="dashboard"><div className="dash-side"><span/><i/><i/><i/><i/></div><div className="dash-body"><span className="dash-title">经营概览 <b>↗</b></span><div className="dash-stats"><div>今日成交<b>¥ 28,640<span>+18.6%</span></b></div><div>新增订单<b>128<span>+12.4%</span></b></div></div><div className="chart-bars">{[26,43,34,59,48,68,56,82,70,94,80,110].map((v,i)=><i key={i} style={{height:v}}/>)}</div><div className="chart-bottom"><span>周一</span><span>周三</span><span>周五</span><span>周日</span></div></div></div><div className="float-note"><span className="note-check">✓</span><span>每一份增长，清晰可见<small>Jasper 为你记录</small></span></div></>}
    {kind === 'minimal' && <><div className="type-sculpture">J<span>.</span></div><span className="minimal-caption">Simple is powerful.</span><div className="minimal-rule"/></>}
    {kind === 'space' && <><div className="orbital o1"/><div className="orbital o2"/><div className="orbital o3"/><div className="planet"><Brand compact/></div><i className="satellite s1"/><i className="satellite s2"/><span className="orbit-label l1">商品中心</span><span className="orbit-label l2">订单中心</span><span className="orbit-label l3">会员中心</span><div className="space-line"/></>}
    {kind === 'jade' && <><div className="jade-sun"/><div className="mountain m-back"/><div className="mountain m-mid"/><div className="mountain m-front"/><div className="jade-river"/><div className="jade-seal">有序<br/>有为</div><span className="landscape-note">山有序 · 水有声</span></>}
    {kind === 'orange' && <><div className="orange-orbit"/><div className="parcel p1"><span>J.</span></div><div className="parcel p2"><span>J.</span></div><div className="parcel p3"><span>↗</span></div><div className="orange-sticker">Good business.<br/><b>Great everyday.</b></div><span className="orange-spark">✳</span></>}
    {kind === 'glass' && <><div className="glass-orb"/><div className="glass-orb small"/><div className="glass-window back"/><div className="glass-window front"><span className="glass-logo">J.</span><span>一切，尽在掌握</span><div className="glass-lines"><i/><i/><i/></div><div className="glass-small-cards"><i/><i/><i/></div></div><div className="glass-chip">✧ &nbsp; 灵感与效率，同频发生</div></>}
    {kind === 'swiss' && <><div className="swiss-j">J<span>®</span></div><div className="swiss-grid"/><span className="swiss-bottom">An operating system<br/>for better business.</span><div className="swiss-arrow">↗</div></>}
    {kind === 'gold' && <><div className="gold-arch ga1"/><div className="gold-arch ga2"/><div className="gold-arch ga3"/><div className="gold-arch ga4"/><div className="gold-center">J<span>Jasper</span></div><div className="gold-line"/><span className="gold-signature">Crafted for your business</span></>}
    {kind === 'blueprint' && <><div className="blueprint-axis x"/><div className="blueprint-axis y"/><div className="wire-cube cube1"><i/><b/><span/></div><div className="wire-cube cube2"><i/><b/><span/></div><div className="wire-cube cube3"><i/><b/><span/></div><div className="measure measure1">商品 / 订单 / 会员</div><div className="measure measure2">一个平台 · 有序连接</div><span className="blueprint-cross c1">+</span><span className="blueprint-cross c2">+</span><span className="blueprint-cross c3">+</span></>}
    {kind === 'peach' && <><div className="peach-disc"/><div className="peach-arch"/><div className="peach-ball"/><div className="peach-platform"/><div className="peach-note"><span>♡</span> 美好的经营，从这里开始</div><div className="peach-stem"><i/><b/></div></>}
  </div>;
}

function LoginForm({ design, preview = false }) {
  const [tab, setTab] = useState('account');
  const [seconds, setSeconds] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [api, contextHolder] = message.useMessage();
  const [modal, modalContext] = Modal.useModal();
  useEffect(() => { if (!seconds) return; const timer = setTimeout(() => setSeconds(seconds - 1), 1000); return () => clearTimeout(timer); }, [seconds]);
  const info = (title, content) => modal.info({title, content, okText: '知道了', centered:true});
  const submit = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 550));
    setLoading(false);
    api.success('登录表单验证通过。这是界面预览，未连接后台。');
  };
  const getCode = async () => {
    try { await form.validateFields(['phone']); setSeconds(60); api.info('演示验证码：246810（不会发送短信）'); } catch (_) {}
  };
  return <div className="login-inner">
    {contextHolder}{modalContext}
    <div className="welcome"><div className="welcome-kicker">欢迎使用 Jasper</div><h2>欢迎回来</h2><p>登录你的工作空间，开启今天的经营。</p></div>
    <Tabs activeKey={tab} onChange={key => {setTab(key);form.resetFields();}} items={[{key:'account', label:'账号密码登录'},{key:'phone', label:'手机号登录'}]}/>
    <Form name={`login-${design.id}-${preview?'mini':'detail'}`} form={form} layout="vertical" onFinish={submit} requiredMark={false} autoComplete="off" className="login-form" initialValues={{remember:true}}>
      {tab === 'account' ? <>
        <Form.Item name="username" label="账号" rules={[{ required:true, whitespace:true, message:'请输入你的账号' }]}><Input size="large" prefix={<Icon name="user"/>} placeholder="请输入账号" autoComplete="off"/></Form.Item>
        <Form.Item name="password" label="密码" rules={[{ required:true, message:'请输入密码' },{min:6,message:'密码至少 6 位'}]}><Input.Password size="large" prefix={<Icon name="lock"/>} placeholder="请输入密码" autoComplete="new-password"/></Form.Item>
      </> : <>
        <Form.Item name="phone" label="手机号" rules={[{required:true,message:'请输入手机号'},{pattern:/^1[3-9]\d{9}$/,message:'请输入有效的 11 位手机号'}]}><Input size="large" prefix={<Icon name="phone"/>} placeholder="请输入手机号" maxLength={11}/></Form.Item>
        <Form.Item label="验证码" className="code-item"><div className="code-row"><Form.Item name="code" noStyle rules={[{required:true,message:'请输入验证码'},{pattern:/^246810$/,message:'演示验证码为 246810'}]}><Input size="large" prefix={<Icon name="shield"/>} placeholder="6 位验证码" maxLength={6}/></Form.Item><Button size="large" onClick={getCode} disabled={seconds>0}>{seconds ? `${seconds}s 后重试` : '获取验证码'}</Button></div></Form.Item>
      </>}
      <div className="form-options"><Form.Item name="remember" valuePropName="checked" noStyle><Checkbox>记住账号</Checkbox></Form.Item><button type="button" className="text-link" onClick={()=>info('找回密码','请联系你的企业管理员重置密码。此预览不会修改任何账号。')}>忘记密码？</button></div>
      <Button type="primary" size="large" block htmlType="submit" loading={loading} className="login-submit">登录工作台 <Icon name="arrow" size={17}/></Button>
    </Form>
    <div className="other-login"><span>其他登录方式</span><div><button type="button" aria-label="企业微信登录" onClick={()=>info('企业微信登录','正式接入后将在这里展示企业微信授权登录。')}><Icon name="chat" size={19}/></button><button type="button" aria-label="企业统一登录" onClick={()=>info('企业统一登录','正式接入后将跳转到企业身份认证平台。')}><Icon name="building" size={19}/></button><span className="other-divider"/><button type="button" className="contact-admin" onClick={()=>info('申请账号','请联系你的企业管理员开通 Jasper 工作空间账号。')}>联系管理员</button></div></div>
    <p className="security-note"><Icon name="shield" size={13}/> 安心登录，专注每一天的经营</p>
  </div>;
}

function LoginPage({ design, miniature = false }) {
  const d = design;
  return <ConfigProvider theme={{algorithm:d.dark?theme.darkAlgorithm:theme.defaultAlgorithm,token:{colorPrimary:d.color,borderRadius:d.kind==='swiss'?0:d.kind==='minimal'?4:8,fontFamily:'"Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',controlHeightLG:48,colorBgContainer:d.dark?(d.kind==='gold'?'#20262d':'#11203a'):'#ffffff'},components:{Button:{primaryShadow:'none',fontWeight:600},Input:{activeShadow:`0 0 0 3px ${d.color}15`},Tabs:{horizontalItemGutter:30}}}}>
    <section className={`login-page style-${d.kind} ${d.dark?'is-dark':''} ${miniature?'miniature':''}`} style={{'--accent':d.color,'--page-bg':d.bg}}>
      <header className="page-header"><Brand/><div className="page-tools"><span>简体中文</span><span className="language-symbol">文 A</span></div></header>
      <main className="page-body">
        <section className="story-panel"><div className="story-copy"><span className="story-label">Jasper 商城管理平台</span><h1>{d.headline.map(line=><React.Fragment key={line}>{line}<br/></React.Fragment>)}</h1><p>{d.sub}</p></div><Art kind={d.kind}/><div className="story-caption"><span className="caption-line"/>{d.caption}</div></section>
        <section className="form-panel"><LoginForm design={d} preview={miniature}/></section>
      </main>
      <footer className="page-footer"><span>© 2026 Jasper. All rights reserved.</span><div><span>帮助中心</span><span>隐私政策</span><span>服务条款</span></div></footer>
    </section>
  </ConfigProvider>;
}

function Miniature({ design }) {
  const host = useRef(null);
  const [scale, setScale] = useState(.38);
  useEffect(()=>{const ro=new ResizeObserver(([entry])=>setScale(entry.contentRect.width/1280));if(host.current)ro.observe(host.current);return()=>ro.disconnect();},[]);
  return <div className="mini-viewport" ref={host} style={{height:800*scale}}><div className="mini-canvas" style={{transform:`scale(${scale})`}} inert="" aria-hidden="true"><LoginPage design={design} miniature/></div></div>;
}

function App() {
  const params = new URLSearchParams(location.search);
  const startingId = params.get('style');
  const [selected,setSelected] = useState(startingId && designs.some(d=>d.id===startingId)?startingId:null);
  const [category,setCategory] = useState('全部方案');
  const [device,setDevice] = useState('desktop');
  const [favorites,setFavorites] = useState([]);
  const [clean,setClean] = useState(params.get('clean')==='1');
  const current = designs.find(d=>d.id===selected);
  const select = (id) => {setSelected(id);setDevice('desktop');window.scrollTo(0,0);history.replaceState(null,'',id?`?style=${id}`:location.pathname);};
  useEffect(()=>{document.title=current?`${current.id} ${current.name} · Jasper 登录设计`:'Jasper · 10 种登录设计';},[selected]);
  useEffect(()=>{const handler=e=>{if(e.target.matches('input,textarea'))return;if(e.key==='Escape'){setClean(false);select(null);}if(current && ['ArrowLeft','ArrowRight'].includes(e.key)){const idx=designs.findIndex(d=>d.id===selected);select(designs[(idx+(e.key==='ArrowLeft'?9:1))%10].id);}};window.addEventListener('keydown',handler);return()=>window.removeEventListener('keydown',handler);},[selected]);
  const toggleFavorite=id=>setFavorites(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
  const visible = designs.filter(d=>category==='全部方案'||(category==='浅色系'&&!d.dark)||(category==='深色系'&&d.dark)||(category==='已收藏'&&favorites.includes(d.id)));
  if(current) return <div className={`detail-view ${clean?'clean-view':''}`}>
    {!clean && <div className="preview-toolbar"><button className="back-button" onClick={()=>select(null)}><Icon name="grid" size={16}/> 全部方案</button><div className="current-design"><b>{current.id}</b><span>{current.name}</span><span className="toolbar-en">{current.en}</span></div><div className="preview-controls"><div className="device-switch"><button className={device==='desktop'?'active':''} onClick={()=>setDevice('desktop')}>桌面</button><button className={device==='mobile'?'active':''} onClick={()=>setDevice('mobile')}>手机</button></div><button onClick={()=>toggleFavorite(current.id)} className={favorites.includes(current.id)?'is-favorite':''}>{favorites.includes(current.id)?'♥ 已收藏':'♡ 收藏'}</button><button onClick={()=>setClean(true)}>纯净预览</button><button aria-label="上一个方案" onClick={()=>select(designs[(Number(current.id)+8)%10].id)}><Icon name="left" size={17}/></button><button aria-label="下一个方案" onClick={()=>select(designs[Number(current.id)%10].id)}><Icon name="right" size={17}/></button></div></div>}
    <div className={`detail-stage device-${device}`}><div className="detail-frame"><LoginPage design={current} key={current.id}/></div></div>
    {clean && <button className="exit-clean" onClick={()=>setClean(false)}>退出纯净预览</button>}
  </div>;
  return <div className="gallery">
    <header className="gallery-header"><Brand compact/><span className="gallery-context">设计探索 / 登录体验</span><a href="https://pro-components.antdigital.dev/~demo/_zh_CN_components_login_form_2.html" target="_blank" rel="noreferrer">查看 Pro 官方参考 <span>↗</span></a></header>
    <section className="gallery-intro"><div><div className="intro-label"><span/> Jasper Design Explorations</div><h1>从第一眼，找到你的风格<span>。</span></h1><p>同一种熟悉的登录体验，十种不同的品牌表达。点击任意方案，查看完整界面。</p></div><div className="design-count"><strong>10</strong><span>种视觉方向<br/>供你选择</span></div></section>
    <div className="gallery-filter"><div className="filter-tabs">{['全部方案','浅色系','深色系','已收藏'].map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c}{c==='全部方案'&&<span>10</span>}{c==='已收藏'&&favorites.length>0&&<span>{favorites.length}</span>}</button>)}</div><span className="filter-hint">统一 Pro 登录结构 · 桌面与手机预览</span></div>
    <main className="design-grid">{visible.map(d=><article key={d.id} className="design-card"><div role="button" tabIndex={0} className="design-preview" aria-label={`预览 ${d.id} ${d.name}`} onClick={()=>select(d.id)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(d.id);}}}><Miniature design={d}/><span className="preview-hover">查看完整方案 <Icon name="arrow" size={17}/></span></div><div className="card-meta"><div className="card-title-row"><span className="design-number">{d.id}</span><div><h2>{d.name}<span>{d.en}</span></h2><p>{d.layout}</p></div><button aria-label={`${favorites.includes(d.id)?'取消收藏':'收藏'} ${d.name}`} className={`favorite ${favorites.includes(d.id)?'selected':''}`} onClick={()=>toggleFavorite(d.id)}>{favorites.includes(d.id)?'♥':'♡'}</button></div><div className="card-bottom"><div className="tags">{d.tags.map(t=><span key={t}>{t}</span>)}</div><div className="color-dots"><i style={{background:d.color}}/><i style={{background:d.bg}}/><i style={{background:d.dark?'#44516a':'#dce1e8'}}/></div></div></div></article>)}</main>
    {visible.length===0 && <div className="empty-favorites">还没有收藏。点击方案右下角的 ♡，把喜欢的风格放在一起。</div>}
    <footer className="gallery-footer"><span>Jasper · 登录界面设计集</span><span>仅为视觉与交互演示，未连接真实登录服务。</span></footer>
  </div>;
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
