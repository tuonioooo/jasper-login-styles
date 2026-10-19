const {
  useState,
  useEffect,
  useRef
} = React;
const {
  ConfigProvider,
  Form,
  Input,
  Button,
  Checkbox,
  Tabs,
  Modal,
  message,
  theme
} = antd;
const designs = [{
  id: '01',
  name: '云端商务',
  en: 'Cloud blue',
  kind: 'cloud',
  color: '#245de8',
  bg: '#eff4ff',
  tags: ['经典 Pro', '浅蓝', '企业级'],
  headline: ['每一次经营，', '都有清晰方向。'],
  sub: '让商品、订单与客户，在同一处有序协作。',
  caption: '清晰的秩序，让业务自然生长。',
  layout: '浅蓝品牌画布 / 白色登录面板'
}, {
  id: '02',
  name: '极简留白',
  en: 'Quiet white',
  kind: 'minimal',
  color: '#20252a',
  bg: '#f7f7f5',
  tags: ['极简', '黑白', '大留白'],
  headline: ['少一点繁杂，', '多一点专注。'],
  sub: '专注你的业务，其余的交给 Jasper。',
  caption: '为专注而设计。',
  layout: '纯白空间 / 大字排版 / 细线分区'
}, {
  id: '03',
  name: '深空控制台',
  en: 'Deep space',
  kind: 'space',
  color: '#56c8eb',
  bg: '#0b1830',
  dark: true,
  tags: ['深色', '科技', '轨道'],
  headline: ['连接每个节点，', '掌握业务全貌。'],
  sub: '你的经营世界，在此连接。',
  caption: '一处连接，全局可见。',
  layout: '深蓝夜幕 / 星轨装置 / 暗色表单'
}, {
  id: '04',
  name: '东方青玉',
  en: 'Jade landscape',
  kind: 'jade',
  color: '#2c7667',
  bg: '#eff4ee',
  tags: ['东方', '青绿', '山水'],
  headline: ['从容有序，', '生意自有生机。'],
  sub: '在变化的日常里，建立稳健的经营节奏。',
  caption: '以从容，见长远。',
  layout: '青玉山水 / 宋体标题 / 温润留白'
}, {
  id: '05',
  name: '活力橙光',
  en: 'Commerce orange',
  kind: 'orange',
  color: '#dc4b22',
  bg: '#fff3e7',
  tags: ['零售', '活力', '几何'],
  headline: ['好生意，', '即刻发生。'],
  sub: '从第一件商品，到下一次增长。',
  caption: '把灵感，变成下一笔生意。',
  layout: '橙色品牌面 / 立体货箱 / 高对比按钮'
}, {
  id: '06',
  name: '流光玻璃',
  en: 'Lavender glass',
  kind: 'glass',
  color: '#7756ce',
  bg: '#eee9fb',
  tags: ['通透', '柔紫', '玻璃'],
  headline: ['轻盈协作，', '让灵感落地。'],
  sub: '让每个好想法，都拥有流畅的开始。',
  caption: '轻一点，走得更远。',
  layout: '柔紫光晕 / 磨砂卡片 / 半透明层次'
}, {
  id: '07',
  name: '瑞士红白',
  en: 'Swiss red',
  kind: 'swiss',
  color: '#d92e2e',
  bg: '#f3f1ec',
  tags: ['现代', '红白', '网格'],
  headline: ['经营。', '井然有序。'],
  sub: '秩序是一切效率的开始。',
  caption: '清楚。直接。有效。',
  layout: '朱红版面 / 强字重 / 方角结构'
}, {
  id: '08',
  name: '曜石鎏金',
  en: 'Obsidian gold',
  kind: 'gold',
  color: '#d3b67a',
  bg: '#171c22',
  dark: true,
  tags: ['精品', '深色', '金属'],
  headline: ['每一份用心，', '都值得被成就。'],
  sub: '为注重品质的经营者，打造专属工作空间。',
  caption: '细节之上，自见品质。',
  layout: '曜石底色 / 金色拱门 / 精细边线'
}, {
  id: '09',
  name: '蓝图秩序',
  en: 'Blueprint',
  kind: 'blueprint',
  color: '#185cc5',
  bg: '#e9f0fa',
  tags: ['理性', '工程', '蓝图'],
  headline: ['从构想到运营，', '每一步皆有章法。'],
  sub: '用系统化的方式，构建可持续的业务。',
  caption: '把复杂，交给系统。',
  layout: '工程网格 / 线框空间 / 工具式表单'
}, {
  id: '10',
  name: '柔和杏桃',
  en: 'Peach morning',
  kind: 'peach',
  color: '#b95263',
  bg: '#fbeded',
  tags: ['温暖', '亲和', '柔和'],
  headline: ['新的一天，', '从美好开始。'],
  sub: '照顾好每一位客户，也照顾好你的日常。',
  caption: '让日常经营，多一点温度。',
  layout: '杏桃晨光 / 柔软曲面 / 亲和表单'
}];
function Icon({
  name,
  size = 18
}) {
  const paths = {
    user: React.createElement(React.Fragment, null, React.createElement("circle", {
      cx: "12",
      cy: "8",
      r: "3.5"
    }), React.createElement("path", {
      d: "M5 21v-2a7 7 0 0 1 14 0v2"
    })),
    lock: React.createElement(React.Fragment, null, React.createElement("rect", {
      x: "5",
      y: "10",
      width: "14",
      height: "11",
      rx: "2"
    }), React.createElement("path", {
      d: "M8 10V7a4 4 0 0 1 8 0v3M12 15v2"
    })),
    phone: React.createElement(React.Fragment, null, React.createElement("rect", {
      x: "6",
      y: "2",
      width: "12",
      height: "20",
      rx: "2"
    }), React.createElement("path", {
      d: "M10 18h4"
    })),
    shield: React.createElement(React.Fragment, null, React.createElement("path", {
      d: "m12 2 8 3v6c0 5-4 9-8 11-4-2-8-6-8-11V5Z"
    }), React.createElement("path", {
      d: "m8 12 3 3 5-6"
    })),
    arrow: React.createElement(React.Fragment, null, React.createElement("path", {
      d: "M4 12h16m-6-6 6 6-6 6"
    })),
    grid: React.createElement(React.Fragment, null, React.createElement("rect", {
      x: "3",
      y: "3",
      width: "7",
      height: "7",
      rx: "1"
    }), React.createElement("rect", {
      x: "14",
      y: "3",
      width: "7",
      height: "7",
      rx: "1"
    }), React.createElement("rect", {
      x: "3",
      y: "14",
      width: "7",
      height: "7",
      rx: "1"
    }), React.createElement("rect", {
      x: "14",
      y: "14",
      width: "7",
      height: "7",
      rx: "1"
    })),
    left: React.createElement("path", {
      d: "m14 5-7 7 7 7"
    }),
    right: React.createElement("path", {
      d: "m10 5 7 7-7 7"
    }),
    check: React.createElement("path", {
      d: "m5 12 4 4L19 6"
    }),
    close: React.createElement("path", {
      d: "m6 6 12 12M6 18 18 6"
    }),
    chat: React.createElement(React.Fragment, null, React.createElement("path", {
      d: "M21 11a8 8 0 0 1-9 8l-5 3v-4a8 8 0 1 1 14-7Z"
    }), React.createElement("path", {
      d: "M8 10h.01M12 10h.01M16 10h.01"
    })),
    building: React.createElement(React.Fragment, null, React.createElement("path", {
      d: "M4 21V5l8-3v19M12 8h8v13M2 21h20M8 7v1m0 3v1m0 3v1m8-4v1m0 3v1"
    }))
  };
  return React.createElement("svg", {
    "aria-hidden": "true",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, paths[name] || paths.grid);
}
function Brand({
  compact = false
}) {
  return React.createElement("div", {
    className: `brand ${compact ? 'compact' : ''}`
  }, React.createElement("span", {
    className: "brand-mark"
  }, React.createElement("svg", {
    width: "25",
    height: "27",
    viewBox: "0 0 25 27",
    fill: "none",
    "aria-hidden": "true"
  }, React.createElement("path", {
    d: "M17 3v13c0 5-3 8-8 8-3 0-5-1-7-3l4-4c1 1 2 2 3 2 2 0 3-1 3-4V3Z",
    fill: "currentColor"
  }), React.createElement("path", {
    d: "M21 3h4v5h-4z",
    fill: "currentColor",
    opacity: ".45"
  }))), React.createElement("span", null, "Jasper", React.createElement("span", {
    className: "brand-dot"
  }, ".")), !compact && React.createElement("span", {
    className: "brand-product"
  }, "\u5546\u57CE\u7BA1\u7406\u5E73\u53F0"));
}
function Art({
  kind
}) {
  return React.createElement("div", {
    className: `art art-${kind}`,
    "aria-hidden": "true"
  }, kind === 'cloud' && React.createElement(React.Fragment, null, React.createElement("div", {
    className: "cloud-ring ring-one"
  }), React.createElement("div", {
    className: "cloud-ring ring-two"
  }), React.createElement("div", {
    className: "dashboard"
  }, React.createElement("div", {
    className: "dash-side"
  }, React.createElement("span", null), React.createElement("i", null), React.createElement("i", null), React.createElement("i", null), React.createElement("i", null)), React.createElement("div", {
    className: "dash-body"
  }, React.createElement("span", {
    className: "dash-title"
  }, "\u7ECF\u8425\u6982\u89C8 ", React.createElement("b", null, "\u2197")), React.createElement("div", {
    className: "dash-stats"
  }, React.createElement("div", null, "\u4ECA\u65E5\u6210\u4EA4", React.createElement("b", null, "\xA5 28,640", React.createElement("span", null, "+18.6%"))), React.createElement("div", null, "\u65B0\u589E\u8BA2\u5355", React.createElement("b", null, "128", React.createElement("span", null, "+12.4%")))), React.createElement("div", {
    className: "chart-bars"
  }, [26, 43, 34, 59, 48, 68, 56, 82, 70, 94, 80, 110].map((v, i) => React.createElement("i", {
    key: i,
    style: {
      height: v
    }
  }))), React.createElement("div", {
    className: "chart-bottom"
  }, React.createElement("span", null, "\u5468\u4E00"), React.createElement("span", null, "\u5468\u4E09"), React.createElement("span", null, "\u5468\u4E94"), React.createElement("span", null, "\u5468\u65E5")))), React.createElement("div", {
    className: "float-note"
  }, React.createElement("span", {
    className: "note-check"
  }, "\u2713"), React.createElement("span", null, "\u6BCF\u4E00\u4EFD\u589E\u957F\uFF0C\u6E05\u6670\u53EF\u89C1", React.createElement("small", null, "Jasper \u4E3A\u4F60\u8BB0\u5F55")))), kind === 'minimal' && React.createElement(React.Fragment, null, React.createElement("div", {
    className: "type-sculpture"
  }, "J", React.createElement("span", null, ".")), React.createElement("span", {
    className: "minimal-caption"
  }, "Simple is powerful."), React.createElement("div", {
    className: "minimal-rule"
  })), kind === 'space' && React.createElement(React.Fragment, null, React.createElement("div", {
    className: "orbital o1"
  }), React.createElement("div", {
    className: "orbital o2"
  }), React.createElement("div", {
    className: "orbital o3"
  }), React.createElement("div", {
    className: "planet"
  }, React.createElement(Brand, {
    compact: true
  })), React.createElement("i", {
    className: "satellite s1"
  }), React.createElement("i", {
    className: "satellite s2"
  }), React.createElement("span", {
    className: "orbit-label l1"
  }, "\u5546\u54C1\u4E2D\u5FC3"), React.createElement("span", {
    className: "orbit-label l2"
  }, "\u8BA2\u5355\u4E2D\u5FC3"), React.createElement("span", {
    className: "orbit-label l3"
  }, "\u4F1A\u5458\u4E2D\u5FC3"), React.createElement("div", {
    className: "space-line"
  })), kind === 'jade' && React.createElement(React.Fragment, null, React.createElement("div", {
    className: "jade-sun"
  }), React.createElement("div", {
    className: "mountain m-back"
  }), React.createElement("div", {
    className: "mountain m-mid"
  }), React.createElement("div", {
    className: "mountain m-front"
  }), React.createElement("div", {
    className: "jade-river"
  }), React.createElement("div", {
    className: "jade-seal"
  }, "\u6709\u5E8F", React.createElement("br", null), "\u6709\u4E3A"), React.createElement("span", {
    className: "landscape-note"
  }, "\u5C71\u6709\u5E8F \xB7 \u6C34\u6709\u58F0")), kind === 'orange' && React.createElement(React.Fragment, null, React.createElement("div", {
    className: "orange-orbit"
  }), React.createElement("div", {
    className: "parcel p1"
  }, React.createElement("span", null, "J.")), React.createElement("div", {
    className: "parcel p2"
  }, React.createElement("span", null, "J.")), React.createElement("div", {
    className: "parcel p3"
  }, React.createElement("span", null, "\u2197")), React.createElement("div", {
    className: "orange-sticker"
  }, "Good business.", React.createElement("br", null), React.createElement("b", null, "Great everyday.")), React.createElement("span", {
    className: "orange-spark"
  }, "\u2733")), kind === 'glass' && React.createElement(React.Fragment, null, React.createElement("div", {
    className: "glass-orb"
  }), React.createElement("div", {
    className: "glass-orb small"
  }), React.createElement("div", {
    className: "glass-window back"
  }), React.createElement("div", {
    className: "glass-window front"
  }, React.createElement("span", {
    className: "glass-logo"
  }, "J."), React.createElement("span", null, "\u4E00\u5207\uFF0C\u5C3D\u5728\u638C\u63E1"), React.createElement("div", {
    className: "glass-lines"
  }, React.createElement("i", null), React.createElement("i", null), React.createElement("i", null)), React.createElement("div", {
    className: "glass-small-cards"
  }, React.createElement("i", null), React.createElement("i", null), React.createElement("i", null))), React.createElement("div", {
    className: "glass-chip"
  }, "\u2727 \xA0 \u7075\u611F\u4E0E\u6548\u7387\uFF0C\u540C\u9891\u53D1\u751F")), kind === 'swiss' && React.createElement(React.Fragment, null, React.createElement("div", {
    className: "swiss-j"
  }, "J", React.createElement("span", null, "\xAE")), React.createElement("div", {
    className: "swiss-grid"
  }), React.createElement("span", {
    className: "swiss-bottom"
  }, "An operating system", React.createElement("br", null), "for better business."), React.createElement("div", {
    className: "swiss-arrow"
  }, "\u2197")), kind === 'gold' && React.createElement(React.Fragment, null, React.createElement("div", {
    className: "gold-arch ga1"
  }), React.createElement("div", {
    className: "gold-arch ga2"
  }), React.createElement("div", {
    className: "gold-arch ga3"
  }), React.createElement("div", {
    className: "gold-arch ga4"
  }), React.createElement("div", {
    className: "gold-center"
  }, "J", React.createElement("span", null, "Jasper")), React.createElement("div", {
    className: "gold-line"
  }), React.createElement("span", {
    className: "gold-signature"
  }, "Crafted for your business")), kind === 'blueprint' && React.createElement(React.Fragment, null, React.createElement("div", {
    className: "blueprint-axis x"
  }), React.createElement("div", {
    className: "blueprint-axis y"
  }), React.createElement("div", {
    className: "wire-cube cube1"
  }, React.createElement("i", null), React.createElement("b", null), React.createElement("span", null)), React.createElement("div", {
    className: "wire-cube cube2"
  }, React.createElement("i", null), React.createElement("b", null), React.createElement("span", null)), React.createElement("div", {
    className: "wire-cube cube3"
  }, React.createElement("i", null), React.createElement("b", null), React.createElement("span", null)), React.createElement("div", {
    className: "measure measure1"
  }, "\u5546\u54C1 / \u8BA2\u5355 / \u4F1A\u5458"), React.createElement("div", {
    className: "measure measure2"
  }, "\u4E00\u4E2A\u5E73\u53F0 \xB7 \u6709\u5E8F\u8FDE\u63A5"), React.createElement("span", {
    className: "blueprint-cross c1"
  }, "+"), React.createElement("span", {
    className: "blueprint-cross c2"
  }, "+"), React.createElement("span", {
    className: "blueprint-cross c3"
  }, "+")), kind === 'peach' && React.createElement(React.Fragment, null, React.createElement("div", {
    className: "peach-disc"
  }), React.createElement("div", {
    className: "peach-arch"
  }), React.createElement("div", {
    className: "peach-ball"
  }), React.createElement("div", {
    className: "peach-platform"
  }), React.createElement("div", {
    className: "peach-note"
  }, React.createElement("span", null, "\u2661"), " \u7F8E\u597D\u7684\u7ECF\u8425\uFF0C\u4ECE\u8FD9\u91CC\u5F00\u59CB"), React.createElement("div", {
    className: "peach-stem"
  }, React.createElement("i", null), React.createElement("b", null))));
}
function LoginForm({
  design,
  preview = false
}) {
  const [tab, setTab] = useState('account');
  const [seconds, setSeconds] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [api, contextHolder] = message.useMessage();
  const [modal, modalContext] = Modal.useModal();
  useEffect(() => {
    if (!seconds) return;
    const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);
  const info = (title, content) => modal.info({
    title,
    content,
    okText: '知道了',
    centered: true
  });
  const submit = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 550));
    setLoading(false);
    api.success('登录表单验证通过。这是界面预览，未连接后台。');
  };
  const getCode = async () => {
    try {
      await form.validateFields(['phone']);
      setSeconds(60);
      api.info('演示验证码：246810（不会发送短信）');
    } catch (_) {}
  };
  return React.createElement("div", {
    className: "login-inner"
  }, contextHolder, modalContext, React.createElement("div", {
    className: "welcome"
  }, React.createElement("div", {
    className: "welcome-kicker"
  }, "\u6B22\u8FCE\u4F7F\u7528 Jasper"), React.createElement("h2", null, "\u6B22\u8FCE\u56DE\u6765"), React.createElement("p", null, "\u767B\u5F55\u4F60\u7684\u5DE5\u4F5C\u7A7A\u95F4\uFF0C\u5F00\u542F\u4ECA\u5929\u7684\u7ECF\u8425\u3002")), React.createElement(Tabs, {
    activeKey: tab,
    onChange: key => {
      setTab(key);
      form.resetFields();
    },
    items: [{
      key: 'account',
      label: '账号密码登录'
    }, {
      key: 'phone',
      label: '手机号登录'
    }]
  }), React.createElement(Form, {
    name: `login-${design.id}-${preview ? 'mini' : 'detail'}`,
    form: form,
    layout: "vertical",
    onFinish: submit,
    requiredMark: false,
    autoComplete: "off",
    className: "login-form",
    initialValues: {
      remember: true
    }
  }, tab === 'account' ? React.createElement(React.Fragment, null, React.createElement(Form.Item, {
    name: "username",
    label: "\u8D26\u53F7",
    rules: [{
      required: true,
      whitespace: true,
      message: '请输入你的账号'
    }]
  }, React.createElement(Input, {
    size: "large",
    prefix: React.createElement(Icon, {
      name: "user"
    }),
    placeholder: "\u8BF7\u8F93\u5165\u8D26\u53F7",
    autoComplete: "off"
  })), React.createElement(Form.Item, {
    name: "password",
    label: "\u5BC6\u7801",
    rules: [{
      required: true,
      message: '请输入密码'
    }, {
      min: 6,
      message: '密码至少 6 位'
    }]
  }, React.createElement(Input.Password, {
    size: "large",
    prefix: React.createElement(Icon, {
      name: "lock"
    }),
    placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
    autoComplete: "new-password"
  }))) : React.createElement(React.Fragment, null, React.createElement(Form.Item, {
    name: "phone",
    label: "\u624B\u673A\u53F7",
    rules: [{
      required: true,
      message: '请输入手机号'
    }, {
      pattern: /^1[3-9]\d{9}$/,
      message: '请输入有效的 11 位手机号'
    }]
  }, React.createElement(Input, {
    size: "large",
    prefix: React.createElement(Icon, {
      name: "phone"
    }),
    placeholder: "\u8BF7\u8F93\u5165\u624B\u673A\u53F7",
    maxLength: 11
  })), React.createElement(Form.Item, {
    label: "\u9A8C\u8BC1\u7801",
    className: "code-item"
  }, React.createElement("div", {
    className: "code-row"
  }, React.createElement(Form.Item, {
    name: "code",
    noStyle: true,
    rules: [{
      required: true,
      message: '请输入验证码'
    }, {
      pattern: /^246810$/,
      message: '演示验证码为 246810'
    }]
  }, React.createElement(Input, {
    size: "large",
    prefix: React.createElement(Icon, {
      name: "shield"
    }),
    placeholder: "6 \u4F4D\u9A8C\u8BC1\u7801",
    maxLength: 6
  })), React.createElement(Button, {
    size: "large",
    onClick: getCode,
    disabled: seconds > 0
  }, seconds ? `${seconds}s 后重试` : '获取验证码')))), React.createElement("div", {
    className: "form-options"
  }, React.createElement(Form.Item, {
    name: "remember",
    valuePropName: "checked",
    noStyle: true
  }, React.createElement(Checkbox, null, "\u8BB0\u4F4F\u8D26\u53F7")), React.createElement("button", {
    type: "button",
    className: "text-link",
    onClick: () => info('找回密码', '请联系你的企业管理员重置密码。此预览不会修改任何账号。')
  }, "\u5FD8\u8BB0\u5BC6\u7801\uFF1F")), React.createElement(Button, {
    type: "primary",
    size: "large",
    block: true,
    htmlType: "submit",
    loading: loading,
    className: "login-submit"
  }, "\u767B\u5F55\u5DE5\u4F5C\u53F0 ", React.createElement(Icon, {
    name: "arrow",
    size: 17
  }))), React.createElement("div", {
    className: "other-login"
  }, React.createElement("span", null, "\u5176\u4ED6\u767B\u5F55\u65B9\u5F0F"), React.createElement("div", null, React.createElement("button", {
    type: "button",
    "aria-label": "\u4F01\u4E1A\u5FAE\u4FE1\u767B\u5F55",
    onClick: () => info('企业微信登录', '正式接入后将在这里展示企业微信授权登录。')
  }, React.createElement(Icon, {
    name: "chat",
    size: 19
  })), React.createElement("button", {
    type: "button",
    "aria-label": "\u4F01\u4E1A\u7EDF\u4E00\u767B\u5F55",
    onClick: () => info('企业统一登录', '正式接入后将跳转到企业身份认证平台。')
  }, React.createElement(Icon, {
    name: "building",
    size: 19
  })), React.createElement("span", {
    className: "other-divider"
  }), React.createElement("button", {
    type: "button",
    className: "contact-admin",
    onClick: () => info('申请账号', '请联系你的企业管理员开通 Jasper 工作空间账号。')
  }, "\u8054\u7CFB\u7BA1\u7406\u5458"))), React.createElement("p", {
    className: "security-note"
  }, React.createElement(Icon, {
    name: "shield",
    size: 13
  }), " \u5B89\u5FC3\u767B\u5F55\uFF0C\u4E13\u6CE8\u6BCF\u4E00\u5929\u7684\u7ECF\u8425"));
}
function LoginPage({
  design,
  miniature = false
}) {
  const d = design;
  return React.createElement(ConfigProvider, {
    theme: {
      algorithm: d.dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        colorPrimary: d.color,
        borderRadius: d.kind === 'swiss' ? 0 : d.kind === 'minimal' ? 4 : 8,
        fontFamily: '"Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif',
        controlHeightLG: 48,
        colorBgContainer: d.dark ? d.kind === 'gold' ? '#20262d' : '#11203a' : '#ffffff'
      },
      components: {
        Button: {
          primaryShadow: 'none',
          fontWeight: 600
        },
        Input: {
          activeShadow: `0 0 0 3px ${d.color}15`
        },
        Tabs: {
          horizontalItemGutter: 30
        }
      }
    }
  }, React.createElement("section", {
    className: `login-page style-${d.kind} ${d.dark ? 'is-dark' : ''} ${miniature ? 'miniature' : ''}`,
    style: {
      '--accent': d.color,
      '--page-bg': d.bg
    }
  }, React.createElement("header", {
    className: "page-header"
  }, React.createElement(Brand, null), React.createElement("div", {
    className: "page-tools"
  }, React.createElement("span", null, "\u7B80\u4F53\u4E2D\u6587"), React.createElement("span", {
    className: "language-symbol"
  }, "\u6587 A"))), React.createElement("main", {
    className: "page-body"
  }, React.createElement("section", {
    className: "story-panel"
  }, React.createElement("div", {
    className: "story-copy"
  }, React.createElement("span", {
    className: "story-label"
  }, "Jasper \u5546\u57CE\u7BA1\u7406\u5E73\u53F0"), React.createElement("h1", null, d.headline.map(line => React.createElement(React.Fragment, {
    key: line
  }, line, React.createElement("br", null)))), React.createElement("p", null, d.sub)), React.createElement(Art, {
    kind: d.kind
  }), React.createElement("div", {
    className: "story-caption"
  }, React.createElement("span", {
    className: "caption-line"
  }), d.caption)), React.createElement("section", {
    className: "form-panel"
  }, React.createElement(LoginForm, {
    design: d,
    preview: miniature
  }))), React.createElement("footer", {
    className: "page-footer"
  }, React.createElement("span", null, "\xA9 2026 Jasper. All rights reserved."), React.createElement("div", null, React.createElement("span", null, "\u5E2E\u52A9\u4E2D\u5FC3"), React.createElement("span", null, "\u9690\u79C1\u653F\u7B56"), React.createElement("span", null, "\u670D\u52A1\u6761\u6B3E")))));
}
function Miniature({
  design
}) {
  const host = useRef(null);
  const [scale, setScale] = useState(.38);
  useEffect(() => {
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / 1280));
    if (host.current) ro.observe(host.current);
    return () => ro.disconnect();
  }, []);
  return React.createElement("div", {
    className: "mini-viewport",
    ref: host,
    style: {
      height: 800 * scale
    }
  }, React.createElement("div", {
    className: "mini-canvas",
    style: {
      transform: `scale(${scale})`
    },
    inert: "",
    "aria-hidden": "true"
  }, React.createElement(LoginPage, {
    design: design,
    miniature: true
  })));
}
function App() {
  const params = new URLSearchParams(location.search);
  const startingId = params.get('style');
  const [selected, setSelected] = useState(startingId && designs.some(d => d.id === startingId) ? startingId : null);
  const [category, setCategory] = useState('全部方案');
  const [device, setDevice] = useState('desktop');
  const [favorites, setFavorites] = useState([]);
  const [clean, setClean] = useState(params.get('clean') === '1');
  const current = designs.find(d => d.id === selected);
  const select = id => {
    setSelected(id);
    setDevice('desktop');
    window.scrollTo(0, 0);
    history.replaceState(null, '', id ? `?style=${id}` : location.pathname);
  };
  useEffect(() => {
    document.title = current ? `${current.id} ${current.name} · Jasper 登录设计` : 'Jasper · 10 种登录设计';
  }, [selected]);
  useEffect(() => {
    const handler = e => {
      if (e.target.matches('input,textarea')) return;
      if (e.key === 'Escape') {
        setClean(false);
        select(null);
      }
      if (current && ['ArrowLeft', 'ArrowRight'].includes(e.key)) {
        const idx = designs.findIndex(d => d.id === selected);
        select(designs[(idx + (e.key === 'ArrowLeft' ? 9 : 1)) % 10].id);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selected]);
  const toggleFavorite = id => setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const visible = designs.filter(d => category === '全部方案' || category === '浅色系' && !d.dark || category === '深色系' && d.dark || category === '已收藏' && favorites.includes(d.id));
  if (current) return React.createElement("div", {
    className: `detail-view ${clean ? 'clean-view' : ''}`
  }, !clean && React.createElement("div", {
    className: "preview-toolbar"
  }, React.createElement("button", {
    className: "back-button",
    onClick: () => select(null)
  }, React.createElement(Icon, {
    name: "grid",
    size: 16
  }), " \u5168\u90E8\u65B9\u6848"), React.createElement("div", {
    className: "current-design"
  }, React.createElement("b", null, current.id), React.createElement("span", null, current.name), React.createElement("span", {
    className: "toolbar-en"
  }, current.en)), React.createElement("div", {
    className: "preview-controls"
  }, React.createElement("div", {
    className: "device-switch"
  }, React.createElement("button", {
    className: device === 'desktop' ? 'active' : '',
    onClick: () => setDevice('desktop')
  }, "\u684C\u9762"), React.createElement("button", {
    className: device === 'mobile' ? 'active' : '',
    onClick: () => setDevice('mobile')
  }, "\u624B\u673A")), React.createElement("button", {
    onClick: () => toggleFavorite(current.id),
    className: favorites.includes(current.id) ? 'is-favorite' : ''
  }, favorites.includes(current.id) ? '♥ 已收藏' : '♡ 收藏'), React.createElement("button", {
    onClick: () => setClean(true)
  }, "\u7EAF\u51C0\u9884\u89C8"), React.createElement("button", {
    "aria-label": "\u4E0A\u4E00\u4E2A\u65B9\u6848",
    onClick: () => select(designs[(Number(current.id) + 8) % 10].id)
  }, React.createElement(Icon, {
    name: "left",
    size: 17
  })), React.createElement("button", {
    "aria-label": "\u4E0B\u4E00\u4E2A\u65B9\u6848",
    onClick: () => select(designs[Number(current.id) % 10].id)
  }, React.createElement(Icon, {
    name: "right",
    size: 17
  })))), React.createElement("div", {
    className: `detail-stage device-${device}`
  }, React.createElement("div", {
    className: "detail-frame"
  }, React.createElement(LoginPage, {
    design: current,
    key: current.id
  }))), clean && React.createElement("button", {
    className: "exit-clean",
    onClick: () => setClean(false)
  }, "\u9000\u51FA\u7EAF\u51C0\u9884\u89C8"));
  return React.createElement("div", {
    className: "gallery"
  }, React.createElement("header", {
    className: "gallery-header"
  }, React.createElement(Brand, {
    compact: true
  }), React.createElement("span", {
    className: "gallery-context"
  }, "\u8BBE\u8BA1\u63A2\u7D22 / \u767B\u5F55\u4F53\u9A8C"), React.createElement("a", {
    href: "https://pro-components.antdigital.dev/~demo/_zh_CN_components_login_form_2.html",
    target: "_blank",
    rel: "noreferrer"
  }, "\u67E5\u770B Pro \u5B98\u65B9\u53C2\u8003 ", React.createElement("span", null, "\u2197"))), React.createElement("section", {
    className: "gallery-intro"
  }, React.createElement("div", null, React.createElement("div", {
    className: "intro-label"
  }, React.createElement("span", null), " Jasper Design Explorations"), React.createElement("h1", null, "\u4ECE\u7B2C\u4E00\u773C\uFF0C\u627E\u5230\u4F60\u7684\u98CE\u683C", React.createElement("span", null, "\u3002")), React.createElement("p", null, "\u540C\u4E00\u79CD\u719F\u6089\u7684\u767B\u5F55\u4F53\u9A8C\uFF0C\u5341\u79CD\u4E0D\u540C\u7684\u54C1\u724C\u8868\u8FBE\u3002\u70B9\u51FB\u4EFB\u610F\u65B9\u6848\uFF0C\u67E5\u770B\u5B8C\u6574\u754C\u9762\u3002")), React.createElement("div", {
    className: "design-count"
  }, React.createElement("strong", null, "10"), React.createElement("span", null, "\u79CD\u89C6\u89C9\u65B9\u5411", React.createElement("br", null), "\u4F9B\u4F60\u9009\u62E9"))), React.createElement("div", {
    className: "gallery-filter"
  }, React.createElement("div", {
    className: "filter-tabs"
  }, ['全部方案', '浅色系', '深色系', '已收藏'].map(c => React.createElement("button", {
    key: c,
    className: category === c ? 'active' : '',
    onClick: () => setCategory(c)
  }, c, c === '全部方案' && React.createElement("span", null, "10"), c === '已收藏' && favorites.length > 0 && React.createElement("span", null, favorites.length)))), React.createElement("span", {
    className: "filter-hint"
  }, "\u7EDF\u4E00 Pro \u767B\u5F55\u7ED3\u6784 \xB7 \u684C\u9762\u4E0E\u624B\u673A\u9884\u89C8")), React.createElement("main", {
    className: "design-grid"
  }, visible.map(d => React.createElement("article", {
    key: d.id,
    className: "design-card"
  }, React.createElement("div", {
    role: "button",
    tabIndex: 0,
    className: "design-preview",
    "aria-label": `预览 ${d.id} ${d.name}`,
    onClick: () => select(d.id),
    onKeyDown: e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        select(d.id);
      }
    }
  }, React.createElement(Miniature, {
    design: d
  }), React.createElement("span", {
    className: "preview-hover"
  }, "\u67E5\u770B\u5B8C\u6574\u65B9\u6848 ", React.createElement(Icon, {
    name: "arrow",
    size: 17
  }))), React.createElement("div", {
    className: "card-meta"
  }, React.createElement("div", {
    className: "card-title-row"
  }, React.createElement("span", {
    className: "design-number"
  }, d.id), React.createElement("div", null, React.createElement("h2", null, d.name, React.createElement("span", null, d.en)), React.createElement("p", null, d.layout)), React.createElement("button", {
    "aria-label": `${favorites.includes(d.id) ? '取消收藏' : '收藏'} ${d.name}`,
    className: `favorite ${favorites.includes(d.id) ? 'selected' : ''}`,
    onClick: () => toggleFavorite(d.id)
  }, favorites.includes(d.id) ? '♥' : '♡')), React.createElement("div", {
    className: "card-bottom"
  }, React.createElement("div", {
    className: "tags"
  }, d.tags.map(t => React.createElement("span", {
    key: t
  }, t))), React.createElement("div", {
    className: "color-dots"
  }, React.createElement("i", {
    style: {
      background: d.color
    }
  }), React.createElement("i", {
    style: {
      background: d.bg
    }
  }), React.createElement("i", {
    style: {
      background: d.dark ? '#44516a' : '#dce1e8'
    }
  }))))))), visible.length === 0 && React.createElement("div", {
    className: "empty-favorites"
  }, "\u8FD8\u6CA1\u6709\u6536\u85CF\u3002\u70B9\u51FB\u65B9\u6848\u53F3\u4E0B\u89D2\u7684 \u2661\uFF0C\u628A\u559C\u6B22\u7684\u98CE\u683C\u653E\u5728\u4E00\u8D77\u3002"), React.createElement("footer", {
    className: "gallery-footer"
  }, React.createElement("span", null, "Jasper \xB7 \u767B\u5F55\u754C\u9762\u8BBE\u8BA1\u96C6"), React.createElement("span", null, "\u4EC5\u4E3A\u89C6\u89C9\u4E0E\u4EA4\u4E92\u6F14\u793A\uFF0C\u672A\u8FDE\u63A5\u771F\u5B9E\u767B\u5F55\u670D\u52A1\u3002")));
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App, null));
