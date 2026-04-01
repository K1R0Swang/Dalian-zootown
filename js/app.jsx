const { useState, useEffect, useRef, useCallback, useMemo } = React;

// ==================== ROUTER ====================
function useHashRouter() {
  const [hash, setHash] = useState(window.location.hash || '#/');
  useEffect(() => {
    const handler = () => setHash(window.location.hash || '#/');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const parsed = useMemo(() => {
    const p = hash.replace('#', '') || '/';
    const parts = p.split('/').filter(Boolean);

    if (parts.length === 0) return { route: 'home', params: {} };
    if (parts[0] === 'deer' && parts[1]) return { route: 'deer-profile', params: { id: parts[1] } };
    if (parts[0] === 'admin' && parts[1] === 'match' && parts[2]) return { route: 'admin-match', params: { obsId: parts[2] } };
    if (parts[0] === 'admin' && parts[1] === 'review') return { route: 'admin-review', params: {} };
    if (parts[0] === 'admin' && parts[1] === 'contributors') return { route: 'admin-contributors', params: {} };

    const routeMap = { 'upload': 'upload', 'deer-list': 'deer-list', 'map': 'map', 'education': 'education', 'admin': 'admin' };
    return { route: routeMap[parts[0]] || 'home', params: {} };
  }, [hash]);

  return parsed;
}

function navigate(path) {
  window.location.hash = path;
  window.scrollTo(0, 0);
}

// ==================== COMPONENTS ====================

function NavLink({ to, children, className }) {
  return (
    <a href={'#' + to} className={className} onClick={(e) => { e.preventDefault(); navigate(to); }}>
      {children}
    </a>
  );
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { route } = useHashRouter();

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-brand">🦌 达里尼动物城</NavLink>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
        <div className={'navbar-links' + (menuOpen ? ' open' : '')}>
          <NavLink to="/" className={'nav-link' + (route === 'home' ? ' active' : '')}>首页</NavLink>
          <NavLink to="/deer-list" className={'nav-link' + (route === 'deer-list' ? ' active' : '')}>鹿档案</NavLink>
          <NavLink to="/map" className={'nav-link' + (route === 'map' ? ' active' : '')}>观察地图</NavLink>
          <NavLink to="/upload" className={'nav-link' + (route === 'upload' ? ' active' : '')}>上传观察</NavLink>
          <NavLink to="/education" className={'nav-link' + (route === 'education' ? ' active' : '')}>参与科普</NavLink>
          <NavLink to="/admin" className={'nav-link admin-link' + (route.startsWith('admin') ? ' active' : '')}>管理后台</NavLink>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>关于项目</h4>
          <ul>
            <li><a href="#/education">项目简介</a></li>
            <li><a href="#/education">参与指南</a></li>
            <li><a href="#/education">科学背景</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>快速链接</h4>
          <ul>
            <li><a href="#/deer-list">查看鹿档案</a></li>
            <li><a href="#/map">观察地图</a></li>
            <li><a href="#/upload">上传观察</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>联系我们</h4>
          <ul>
            <li>邮箱：deerwatch@dalini.com</li>
            <li>微博：@达里尼动物城</li>
            <li>微信公众号：达里尼梅花鹿</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 达里尼动物城。保护大连梅花鹿，记录野生动物故事。</p>
      </div>
    </footer>
  );
}

function DeerCard({ deer }) {
  const avatarUrl = window.DeerData.getDeerAvatar(deer);
  const obsCount = window.DeerData.observations.filter(o => o.deerId === deer.id && o.status === 'approved').length;

  return (
    <div className="card deer-card">
      <div className="deer-avatar">
        <img src={avatarUrl} alt={deer.name} />
      </div>
      <div className="deer-info">
        <div className="deer-name-header">
          <span className="deer-name">{deer.name}</span>
          <span className="deer-code">{deer.code}</span>
        </div>
        <div className="deer-status">{deer.sex} · {deer.age}</div>
        <div className="deer-features">
          {deer.features.slice(0, 2).map((f, i) => (
            <span key={i} className="feature-tag">{f}</span>
          ))}
        </div>
        <div className="deer-stats">
          <div className="stat-item">📍 {deer.location}</div>
          <div className="stat-item">👁 {obsCount}次目击</div>
        </div>
      </div>
    </div>
  );
}

function ObservationCard({ obs }) {
  const truncateText = (text, len) => text.length > len ? text.substring(0, len) + '...' : text;

  return (
    <div className="card">
      <div className="obs-card">
        <div className="obs-header">
          <div>
            <div className="obs-location">
              {obs.deerName ? (
                <NavLink to={'/deer/' + obs.deerId}>{obs.deerName} {obs.deerCode}</NavLink>
              ) : (
                <span>未识别的梅花鹿</span>
              )}
            </div>
            <div className="obs-date">{obs.locationName}</div>
          </div>
          <span className={'badge ' + 'status-' + obs.status}>
            {obs.status === 'approved' ? '✓ 已验证' : obs.status === 'pending' ? '⏳ 待审核' : '✗ 已拒绝'}
          </span>
        </div>
        <div className="obs-tags">
          {obs.behaviorTags.map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>
        <div className="obs-description">{truncateText(obs.description, 150)}</div>
        <div className="obs-footer">
          <span className="obs-contributor">by {obs.contributor}</span>
          <span className="obs-date">{obs.observedAt ? obs.observedAt.split('T')[0] : obs.createdAt}</span>
        </div>
      </div>
    </div>
  );
}

function LeafletMap({ observations, center, zoom, height, onClick, markerPosition }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const clickMarkerRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    const map = window.L.map(mapRef.current).setView(center || [38.87, 121.61], zoom || 13);
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);
    mapInstance.current = map;

    if (onClick) {
      map.on('click', function(e) {
        onClick(e.latlng);
      });
    }

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return;
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
    if (observations) {
      observations.forEach(obs => {
        if (!obs.lat || !obs.lng) return;
        var icon = window.L.divIcon({
          className: 'deer-marker',
          html: '<div style="background:#2d5016;color:white;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-size:16px;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)">🦌</div>',
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });
        var m = window.L.marker([obs.lat, obs.lng], { icon: icon }).addTo(mapInstance.current);
        var popupContent = '<div style="font-family:var(--font);min-width:200px"><strong>' + (obs.deerName || '未识别') + '</strong>';
        if (obs.deerCode) popupContent += ' <span style="color:#8B6914">' + obs.deerCode + '</span>';
        popupContent += '<br/><span style="color:#666">' + obs.locationName + '</span>';
        popupContent += '<br/>' + (obs.observedAt || '').replace('T', ' ');
        if (obs.behaviorTags) popupContent += '<br/>' + obs.behaviorTags.map(t => '<span style="background:#E8891D;color:white;padding:1px 6px;border-radius:10px;font-size:12px;margin:1px">' + t + '</span>').join(' ');
        popupContent += '</div>';
        m.bindPopup(popupContent);
        markersRef.current.push(m);
      });
    }
  }, [observations]);

  useEffect(() => {
    if (!mapInstance.current) return;
    if (clickMarkerRef.current) {
      clickMarkerRef.current.remove();
      clickMarkerRef.current = null;
    }
    if (markerPosition) {
      var icon = window.L.divIcon({
        className: 'pick-marker',
        html: '<div style="background:#dc3545;color:white;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:14px;border:2px solid white">📍</div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      clickMarkerRef.current = window.L.marker(markerPosition, { icon: icon }).addTo(mapInstance.current);
    }
  }, [markerPosition]);

  return <div ref={mapRef} style={{ height: height || '400px', width: '100%', borderRadius: '8px' }} />;
}

// ==================== PAGES ====================

function HomePage() {
  const stats = window.DeerData.getStats();
  const [displayedStats, setDisplayedStats] = useState({ totalDeer: 0, totalObs: 0, totalContrib: 0, pending: 0 });

  useEffect(() => {
    let counts = { totalDeer: 0, totalObs: 0, totalContrib: 0, pending: 0 };
    let interval = setInterval(() => {
      if (counts.totalDeer < stats.totalDeer) counts.totalDeer++;
      if (counts.totalObs < stats.totalObs) counts.totalObs += Math.ceil(stats.totalObs / 20);
      if (counts.totalContrib < stats.totalContrib) counts.totalContrib++;
      if (counts.pending < stats.pending) counts.pending++;
      setDisplayedStats({ ...counts });
      if (counts.totalDeer >= stats.totalDeer && counts.totalObs >= stats.totalObs && counts.totalContrib >= stats.totalContrib && counts.pending >= stats.pending) {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [stats]);

  const recentObs = window.DeerData.observations.filter(o => o.status === 'approved').sort((a, b) => new Date(b.observedAt) - new Date(a.observedAt)).slice(0, 6);
  const featuredDeer = window.DeerData.deer.filter(d => d.status === 'active').slice(0, 4);

  return (
    <div>
      <div className="hero">
        <div className="container">
          <h1>梅花鹿有名计划</h1>
          <p className="slogan">以大连梅花鹿为切入口，运用AI辅助识别、公众上传与故事化展示，为城市野生动物建立数字身份档案。每一只鹿都值得被认识。</p>
          <div className="hero-buttons">
            <NavLink to="/upload" className="btn btn-primary btn-lg">📸 上传观察</NavLink>
            <NavLink to="/deer-list" className="btn btn-outline btn-lg">🦌 查看鹿档案</NavLink>
            <NavLink to="/map" className="btn btn-secondary btn-lg">🗺️ 浏览地图</NavLink>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{Math.min(displayedStats.totalDeer, stats.totalDeer)}</div>
              <div className="stat-label">已识别的梅花鹿</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{Math.min(displayedStats.totalObs, stats.totalObs)}</div>
              <div className="stat-label">次观察记录</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{Math.min(displayedStats.totalContrib, stats.totalContrib)}</div>
              <div className="stat-label">位项目志愿者</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{Math.min(displayedStats.pending, stats.pending)}</div>
              <div className="stat-label">待审核观察</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>明星鹿档案</h2>
          <div className="grid-4">
            {featuredDeer.map(deer => (
              <NavLink key={deer.id} to={'/deer/' + deer.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <DeerCard deer={deer} />
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>最新观察</h2>
          <div className="grid-2">
            {recentObs.map(obs => (
              <ObservationCard key={obs.id} obs={obs} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>文明观鹿提醒</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div className="card">
              <div className="card-body">
                <h3 style={{ color: '#28a745', marginBottom: '0.8rem' }}>✓ 建议做法</h3>
                <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                  <li>保持足够距离（30米以上）</li>
                  <li>轻声说话，不发出噪音</li>
                  <li>不投喂任何食物</li>
                  <li>使用望远镜或相机观察</li>
                  <li>上传观察照片和数据</li>
                </ul>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <h3 style={{ color: '#dc3545', marginBottom: '0.8rem' }}>✗ 禁止行为</h3>
                <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
                  <li>靠近或追赶梅花鹿</li>
                  <li>投喂食物或盐分</li>
                  <li>大声呼救或驱赶</li>
                  <li>使用无人机骚扰</li>
                  <li>在繁殖季节进入活动区域</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container text-center">
          <h2>加入我们</h2>
          <p style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#666' }}>无论您是摄影爱好者、自然观察者还是数据爱好者，都可以为保护大连梅花鹿作出贡献。</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <NavLink to="/upload" className="btn btn-primary btn-lg">开始上传</NavLink>
            <NavLink to="/education" className="btn btn-outline btn-lg">了解更多</NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}

function UploadPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [behaviors, setBehaviors] = useState([]);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState(null);
  const [success, setSuccess] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

  const behaviorOptions = ['觅食', '行走', '休息', '群居', '饮水', '哺育', '奔跑', '警觉'];

  const handleFileUpload = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      const reader = new FileReader();
      reader.onload = (event) => setPreview(event.target.result);
      reader.readAsDataURL(f);
    }
  };

  const handleMapClick = (latlng) => {
    setCoordinates({ lat: latlng.lat.toFixed(4), lng: latlng.lng.toFixed(4) });
    setMapOpen(false);
  };

  const toggleBehavior = (b) => {
    setBehaviors(behaviors.includes(b) ? behaviors.filter(x => x !== b) : [...behaviors, b]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file || !location || !coordinates || !description || !name) {
      alert('请填写所有必需字段');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setMatches(window.DeerData.mockAIMatch());
      setLoading(false);
    }, 2000);
  };

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      setFile(null);
      setPreview(null);
      setLocation('');
      setCoordinates(null);
      setDate(new Date().toISOString().split('T')[0]);
      setBehaviors([]);
      setDescription('');
      setName('');
      setMatches(null);
      setSuccess(false);
    }, 3000);
  };

  if (success) {
    return (
      <div className="section">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <h2>上传成功！</h2>
            <p style={{ fontSize: '1.1rem', color: '#666', marginBottom: '2rem' }}>感谢您对梅花鹿保护项目的贡献。您的观察已提交审核，我们会在24小时内给予反馈。</p>
            <NavLink to="/upload" className="btn btn-primary">继续上传</NavLink>
          </div>
        </div>
      </div>
    );
  }

  if (matches) {
    return (
      <div className="section">
        <div className="container">
          <h2>AI智能匹配结果</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>根据您上传的照片，AI分析出以下可能的匹配鹿只。请确认或创建新档案。</p>
          {matches.map(m => (
            <div key={m.deerId} className="match-item">
              <div className="match-header">
                <div>
                  <div className="match-name">{m.name} {m.code}</div>
                  <div style={{ color: '#666', fontSize: '0.9rem' }}>特征：{m.features}</div>
                </div>
                <div className="match-similarity">{m.similarity}%</div>
              </div>
              <div className="similarity-bar">
                <div className="similarity-fill" style={{ width: m.similarity + '%' }}></div>
              </div>
              <div className="match-actions">
                <button className="btn btn-success btn-sm" onClick={handleSuccess}>确认匹配</button>
                <NavLink to={'/deer/' + m.deerId} className="btn btn-outline btn-sm">查看档案</NavLink>
              </div>
            </div>
          ))}
          <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f0ebe0', borderRadius: '8px' }}>
            <h3>以上都不符合？</h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>这可能是一只新的梅花鹿。</p>
            <button className="btn btn-primary" onClick={handleSuccess}>创建新档案</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container" style={{ maxWidth: '800px' }}>
        <h2>上传观察</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>帮助我们记录大连梅花鹿的故事</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>观察照片 *</label>
            <div className={'dropzone' + (preview ? ' active' : '')}>
              <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} id="fileInput" />
              <label htmlFor="fileInput" style={{ cursor: 'pointer', display: 'block' }}>
                <div className="dropzone-icon">📸</div>
                <div className="dropzone-text">点击或拖放上传照片</div>
                <div className="dropzone-hint">支持JPG、PNG等格式</div>
              </label>
            </div>
            {preview && (
              <div className="upload-preview">
                <img src={preview} alt="preview" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>您的名字 *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="用于展示您的贡献" />
          </div>

          <div className="form-group">
            <label>观察地点 *</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="例如：滨海路森林公园" />
          </div>

          <div className="form-group">
            <label>坐标 *</label>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
              <input type="text" placeholder="纬度" value={coordinates?.lat || ''} readOnly style={{ flex: 1 }} />
              <input type="text" placeholder="经度" value={coordinates?.lng || ''} readOnly style={{ flex: 1 }} />
            </div>
            <button type="button" className="btn btn-outline" onClick={() => setMapOpen(!mapOpen)}>
              {mapOpen ? '隐藏地图' : '在地图上选择'}
            </button>
            {mapOpen && (
              <div className="map-container" style={{ marginTop: '1rem' }}>
                <LeafletMap onClick={handleMapClick} center={[38.87, 121.61]} zoom={13} height="300px" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>观察日期 *</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div className="form-group">
            <label>鹿的行为 *</label>
            <div className="behavior-toggle-group">
              {behaviorOptions.map(b => (
                <button
                  key={b}
                  type="button"
                  className={'behavior-toggle' + (behaviors.includes(b) ? ' active' : '')}
                  onClick={() => toggleBehavior(b)}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>观察描述 *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="详细描述您看到的梅花鹿、它的特征和行为（至少50字）"
            ></textarea>
            <div className="help-text">{description.length} / 500字</div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
              {loading ? <span className="spinner"></span> : null}
              {loading ? '处理中...' : '提交观察'}
            </button>
            <NavLink to="/" className="btn btn-outline btn-lg">取消</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeerProfilePage({ deerId }) {
  const deer = window.DeerData.deer.find(d => d.id === deerId);
  const deerObs = window.DeerData.observations.filter(o => o.deerId === deerId && o.status === 'approved').sort((a, b) => new Date(b.observedAt) - new Date(a.observedAt));

  if (!deer) {
    return (
      <div className="section">
        <div className="container text-center">
          <h2>未找到该鹿档案</h2>
          <NavLink to="/deer-list" className="btn btn-primary">返回鹿档案列表</NavLink>
        </div>
      </div>
    );
  }

  const avatarUrl = window.DeerData.getDeerAvatar(deer);

  return (
    <div>
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="card">
              <div style={{ width: '100%', height: '300px', backgroundColor: '#f0f0f0', overflow: 'hidden' }}>
                <img src={avatarUrl} alt={deer.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{deer.name}</h1>
                <span className="badge status-active">{deer.code}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
                <div className="card">
                  <div className="card-body">
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>性别</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: '600', marginTop: '0.5rem' }}>{deer.sex}</div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>推测年龄</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: '600', marginTop: '0.5rem' }}>{deer.age}</div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>首次发现</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: '600', marginTop: '0.5rem' }}>{deer.firstSeen}</div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div style={{ fontSize: '0.9rem', color: '#666' }}>常见地点</div>
                    <div style={{ fontSize: '1.3rem', fontWeight: '600', marginTop: '0.5rem' }}>{deer.location}</div>
                  </div>
                </div>
              </div>

              <h3>识别特征</h3>
              <div className="deer-features" style={{ marginBottom: '2rem' }}>
                {deer.features.map((f, i) => (
                  <span key={i} className="feature-tag">{f}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>{deer.name}的故事</h2>
          <div className="card">
            <div className="card-body">
              <p style={{ lineHeight: '1.8', fontSize: '1rem', color: '#333' }}>{deer.story}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>目击记录 ({deerObs.length})</h2>
          {deerObs.length > 0 ? (
            <div className="timeline">
              {deerObs.map(obs => (
                <div key={obs.id} className="timeline-item">
                  <div className="timeline-date">{obs.observedAt.split('T')[0]}</div>
                  <div className="timeline-content">
                    <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>{obs.locationName}</div>
                    <div style={{ color: '#666', marginBottom: '0.8rem' }}>{obs.description}</div>
                    <div className="obs-tags">
                      {obs.behaviorTags.map((tag, i) => (
                        <span key={i} className="tag" style={{ fontSize: '0.8rem' }}>{tag}</span>
                      ))}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#999', marginTop: '0.5rem' }}>记录者：{obs.contributor}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#666', textAlign: 'center', padding: '2rem' }}>暂无目击记录</p>
          )}
        </div>
      </section>

      {deerObs.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <h2>观察地点分布</h2>
            <div className="map-container">
              <LeafletMap observations={deerObs} center={[38.87, 121.61]} zoom={13} height="400px" />
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container text-center">
          <h3>您也见过{deer.name}吗？</h3>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>分享您的观察照片和记录</p>
          <NavLink to="/upload" className="btn btn-primary btn-lg">上传观察</NavLink>
        </div>
      </section>
    </div>
  );
}

function DeerListPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('active');

  const filtered = window.DeerData.deer.filter(d => {
    if (statusFilter !== 'all' && d.status !== statusFilter) return false;
    if (search && !d.name.includes(search) && !d.code.includes(search)) return false;
    return true;
  });

  return (
    <div className="section">
      <div className="container">
        <h2>梅花鹿档案库</h2>

        <div className="form-group">
          <input
            type="text"
            placeholder="搜索鹿名或代码..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginBottom: '1rem' }}
          />
        </div>

        <div className="filter-buttons">
          <button className={'filter-btn' + (statusFilter === 'active' ? ' active' : '')} onClick={() => setStatusFilter('active')}>
            🟢 活跃 ({window.DeerData.deer.filter(d => d.status === 'active').length})
          </button>
          <button className={'filter-btn' + (statusFilter === 'unconfirmed' ? ' active' : '')} onClick={() => setStatusFilter('unconfirmed')}>
            🟡 待确认 ({window.DeerData.deer.filter(d => d.status === 'unconfirmed').length})
          </button>
          <button className={'filter-btn' + (statusFilter === 'all' ? ' active' : '')} onClick={() => setStatusFilter('all')}>
            全部 ({window.DeerData.deer.length})
          </button>
        </div>

        <div className="grid-3">
          {filtered.map(deer => (
            <NavLink key={deer.id} to={'/deer/' + deer.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <DeerCard deer={deer} />
            </NavLink>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#666' }}>
            <p>未找到符合条件的鹿档案</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MapPage() {
  const approvedObs = window.DeerData.observations.filter(o => o.status === 'approved');

  return (
    <div>
      <section className="section">
        <div className="container">
          <h2>梅花鹿观察地图</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>点击地图上的标记查看观察详情</p>
        </div>
      </section>

      <section style={{ padding: '0 20px 60px 20px' }}>
        <div className="container">
          <div className="map-container">
            <LeafletMap observations={approvedObs} center={[38.87, 121.61]} zoom={13} height="600px" />
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>热点区域</h2>
          <div className="grid-3">
            {['滨海路森林公园', '棒棰岛景区', '老虎滩附近山林', '付家庄公园', '南部海滨步道'].map((loc, i) => (
              <div key={i} className="card">
                <div className="card-body">
                  <h3>📍 {loc}</h3>
                  <p style={{ color: '#666' }}>
                    {approvedObs.filter(o => o.locationName.includes(loc)).length}次观察记录
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function EducationPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: '什么是梅花鹿有名计划？', a: '这是一个公众科学项目，旨在通过记录和识别大连地区的梅花鹿个体，为这些野生动物建立数字档案，提高公众保护意识。' },
    { q: '如何上传我的观察？', a: '点击导航栏的"上传观察"，选择您的照片并填写观察信息。我们的AI系统会自动尝试匹配现有鹿只，如不匹配则创建新档案。' },
    { q: '我如何成为志愿者？', a: '任何热爱自然的人都可以参与！只需上传观察记录、照片和数据。根据您的贡献，您将获得积分和认可。' },
    { q: '为什么不能投喂梅花鹿？', a: '投喂会改变鹿的自然行为，使其对人类依赖，甚至可能传播疾病。我们提倡远距离观察和保护。' },
    { q: '如何区分梅花鹿的性别？', a: '雄鹿有角，通常体型更大，颈部更粗；雌鹿无角，体型较小。但在冬季，雄鹿会脱角，需要观察其他特征。' },
    { q: '我的上传多久能被审核？', a: '通常24小时内完成审核。审核通过的观察会立即出现在地图和档案中。' }
  ];

  return (
    <div>
      <section className="section">
        <div className="container">
          <h2>参与科普与指南</h2>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>项目背景</h3>
          <div className="card">
            <div className="card-body">
              <p style={{ lineHeight: '1.8' }}>梅花鹿是中国特有的珍贵野生动物。在大连，一个小种群在城市边缘地带生活繁衍。通过"梅花鹿有名计划"，我们希望能够：</p>
              <ul style={{ paddingLeft: '2rem', lineHeight: '1.8', marginTop: '1rem' }}>
                <li>记录并保护这个珍贵种群</li>
                <li>增进市民对野生动物的认识和关爱</li>
                <li>积累长期的种群动态数据</li>
                <li>为科学保护工作提供支持</li>
              </ul>
            </div>
          </div>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>志愿者等级与积分</h3>
          <div className="card">
            <table className="table">
              <thead>
                <tr>
                  <th>等级</th>
                  <th>所需积分</th>
                  <th>权限</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>见习观察员</td>
                  <td>0-50</td>
                  <td>上传观察、参与评论</td>
                </tr>
                <tr>
                  <td>资深观察员</td>
                  <td>51-200</td>
                  <td>上述+参与审核</td>
                </tr>
                <tr>
                  <td>专家观察员</td>
                  <td>201+</td>
                  <td>上述+参与档案编辑</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>常见问题</h3>
          <div>
            {faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <div className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{faq.q}</span>
                  <span className={'faq-toggle' + (openFaq === i ? ' open' : '')}>▼</span>
                </div>
                <div className={'faq-answer' + (openFaq === i ? ' open' : '')}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>联系我们</h3>
          <div className="card">
            <div className="card-body">
              <p>有任何问题或建议？请联系我们：</p>
              <ul style={{ paddingLeft: '2rem', marginTop: '1rem', lineHeight: '2' }}>
                <li>邮箱：deerwatch@dalini.com</li>
                <li>微博：@达里尼动物城</li>
                <li>微信公众号：达里尼梅花鹿</li>
                <li>电话：0411-XXXX-XXXX</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function AdminDashboard() {
  const stats = window.DeerData.getStats();

  return (
    <div className="section">
      <div className="container">
        <h2>🔒 管理后台</h2>

        <div className="admin-nav">
          <NavLink to="/admin/review" className="admin-nav-link">审核待处理</NavLink>
          <NavLink to="/admin/match" className="admin-nav-link">智能匹配</NavLink>
          <NavLink to="/admin/contributors" className="admin-nav-link">贡献者管理</NavLink>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#28a745' }}>{stats.pending}</div>
            <div className="stat-label">待审核观察</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#2d5016' }}>{stats.totalDeer}</div>
            <div className="stat-label">已识别鹿只</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#E8891D' }}>{stats.totalObs}</div>
            <div className="stat-label">已审核观察</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#8B6914' }}>{stats.totalContrib}</div>
            <div className="stat-label">志愿者总数</div>
          </div>
        </div>

        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>最近待审核</h3>
        <div className="grid-2">
          {window.DeerData.observations.filter(o => o.status === 'pending').slice(0, 4).map(obs => (
            <ObservationCard key={obs.id} obs={obs} />
          ))}
        </div>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <NavLink to="/admin/review" className="btn btn-primary">查看全部待审核</NavLink>
        </div>
      </div>
    </div>
  );
}

function AdminReviewList() {
  const [observations, setObservations] = useState(window.DeerData.observations);
  const [filter, setFilter] = useState('pending');

  const filtered = observations.filter(o => filter === 'all' || o.status === filter);

  const updateStatus = (id, status) => {
    setObservations(observations.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <div className="section">
      <div className="container">
        <h2>观察审核管理</h2>

        <div className="filter-buttons">
          <button className={'filter-btn' + (filter === 'pending' ? ' active' : '')} onClick={() => setFilter('pending')}>
            ⏳ 待审核 ({observations.filter(o => o.status === 'pending').length})
          </button>
          <button className={'filter-btn' + (filter === 'approved' ? ' active' : '')} onClick={() => setFilter('approved')}>
            ✓ 已批准 ({observations.filter(o => o.status === 'approved').length})
          </button>
          <button className={'filter-btn' + (filter === 'all' ? ' active' : '')} onClick={() => setFilter('all')}>
            全部 ({observations.length})
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>地点</th>
                <th>鹿只</th>
                <th>日期</th>
                <th>贡献者</th>
                <th>状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(obs => (
                <tr key={obs.id}>
                  <td>#{obs.id}</td>
                  <td>{obs.locationName}</td>
                  <td>{obs.deerName ? `${obs.deerName} (${obs.deerCode})` : '未识别'}</td>
                  <td>{obs.observedAt?.split('T')[0]}</td>
                  <td>{obs.contributor}</td>
                  <td><span className={'badge status-' + obs.status}>{obs.status === 'approved' ? '✓ 已批准' : obs.status === 'pending' ? '⏳ 待审核' : '✗ 已拒绝'}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {obs.status !== 'approved' && (
                        <button className="btn btn-success btn-sm" onClick={() => updateStatus(obs.id, 'approved')}>批准</button>
                      )}
                      {obs.status !== 'rejected' && (
                        <button className="btn btn-danger btn-sm" onClick={() => updateStatus(obs.id, 'rejected')}>拒绝</button>
                      )}
                      {obs.deerId === null && (
                        <NavLink to={'/admin/match/' + obs.id} className="btn btn-outline btn-sm">匹配</NavLink>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminCandidateMatch({ obsId }) {
  const obs = window.DeerData.observations.find(o => o.id === obsId);
  const matches = window.DeerData.mockAIMatch();

  if (!obs) {
    return (
      <div className="section">
        <div className="container">
          <h2>观察不存在</h2>
          <NavLink to="/admin/review" className="btn btn-primary">返回审核</NavLink>
        </div>
      </div>
    );
  }

  const handleMatch = (deerId) => {
    alert('已匹配到 ID: ' + deerId);
    navigate('/admin/review');
  };

  return (
    <div className="section">
      <div className="container">
        <h2>智能匹配 - 观察 #{obs.id}</h2>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body">
            <h3>观察信息</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginTop: '1rem' }}>
              <div><strong>地点：</strong> {obs.locationName}</div>
              <div><strong>日期：</strong> {obs.observedAt?.split('T')[0]}</div>
              <div><strong>贡献者：</strong> {obs.contributor}</div>
              <div><strong>行为：</strong> {obs.behaviorTags.join('、')}</div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <strong>描述：</strong>
              <p style={{ marginTop: '0.5rem', color: '#666' }}>{obs.description}</p>
            </div>
          </div>
        </div>

        <h3>AI 候选匹配</h3>
        {matches.map(m => (
          <div key={m.deerId} className="match-item">
            <div className="match-header">
              <div>
                <div className="match-name">{m.name} {m.code}</div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>特征：{m.features}</div>
              </div>
              <div className="match-similarity">{m.similarity}%</div>
            </div>
            <div className="similarity-bar">
              <div className="similarity-fill" style={{ width: m.similarity + '%' }}></div>
            </div>
            <div className="match-actions">
              <button className="btn btn-success btn-sm" onClick={() => handleMatch(m.deerId)}>确认此匹配</button>
              <NavLink to={'/deer/' + m.deerId} className="btn btn-outline btn-sm">查看档案</NavLink>
            </div>
          </div>
        ))}

        <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#f0ebe0', borderRadius: '8px' }}>
          <h3>以上都不符合？</h3>
          <p style={{ color: '#666', marginBottom: '1rem' }}>您可以创建一只新的梅花鹿档案。</p>
          <button className="btn btn-primary">创建新档案</button>
        </div>
      </div>
    </div>
  );
}

function AdminContributors() {
  const [contributors, setContributors] = useState(window.DeerData.contributors);
  const [sortBy, setSortBy] = useState('points');

  const sorted = [...contributors].sort((a, b) => {
    if (sortBy === 'points') return b.points - a.points;
    if (sortBy === 'uploads') return b.uploads - a.uploads;
    return b.reviews - a.reviews;
  });

  const updatePoints = (id, delta) => {
    setContributors(contributors.map(c => c.id === id ? { ...c, points: Math.max(0, c.points + delta) } : c));
  };

  return (
    <div className="section">
      <div className="container">
        <h2>贡献者管理</h2>

        <div className="filter-buttons">
          <button className={'filter-btn' + (sortBy === 'points' ? ' active' : '')} onClick={() => setSortBy('points')}>按积分</button>
          <button className={'filter-btn' + (sortBy === 'uploads' ? ' active' : '')} onClick={() => setSortBy('uploads')}>按上传数</button>
          <button className={'filter-btn' + (sortBy === 'reviews' ? ' active' : '')} onClick={() => setSortBy('reviews')}>按审核数</button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>名称</th>
                <th>积分</th>
                <th>上传数</th>
                <th>审核数</th>
                <th>加入日期</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(c => (
                <tr key={c.id}>
                  <td><strong>{c.name}</strong></td>
                  <td>{c.points}</td>
                  <td>{c.uploads}</td>
                  <td>{c.reviews}</td>
                  <td>{c.joined}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-success btn-sm" onClick={() => updatePoints(c.id, 10)}>+10</button>
                      <button className="btn btn-danger btn-sm" onClick={() => updatePoints(c.id, -10)}>-10</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==================== APP ====================
function App() {
  const { route, params } = useHashRouter();
  let page;

  switch (route) {
    case 'home':
      page = <HomePage />;
      break;
    case 'upload':
      page = <UploadPage />;
      break;
    case 'deer-profile':
      page = <DeerProfilePage deerId={parseInt(params.id)} />;
      break;
    case 'deer-list':
      page = <DeerListPage />;
      break;
    case 'map':
      page = <MapPage />;
      break;
    case 'education':
      page = <EducationPage />;
      break;
    case 'admin':
      page = <AdminDashboard />;
      break;
    case 'admin-review':
      page = <AdminReviewList />;
      break;
    case 'admin-match':
      page = <AdminCandidateMatch obsId={parseInt(params.obsId)} />;
      break;
    case 'admin-contributors':
      page = <AdminContributors />;
      break;
    default:
      page = <HomePage />;
  }

  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">{page}</main>
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
