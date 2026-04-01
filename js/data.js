// window.DeerData - all mock data for the application
window.DeerData = {
  deer: [
    {
      id: 1,
      name: '小白',
      code: 'DL-001',
      sex: '雌',
      age: '3-4岁',
      features: ['右耳有小缺口', '面部白斑较大', '体型偏小'],
      firstSeen: '2025-03-15',
      location: '滨海路森林公园',
      status: 'active',
      story: '小白是最早被志愿者识别和命名的梅花鹿之一。她因面部独特的大面积白斑而得名，性格温和，经常在滨海路森林公园的步道附近活动。2025年春天，一位摄影爱好者首次拍到她时，她正在林间悠闲地觅食。此后多次被不同观察者目击，逐渐成为项目的"形象大使"。'
    },
    {
      id: 2,
      name: '大壮',
      code: 'DL-002',
      sex: '雄',
      age: '5-6岁',
      features: ['鹿角粗壮分三叉', '体型壮硕', '颈部毛色较深'],
      firstSeen: '2025-03-20',
      location: '棒棰岛景区',
      status: 'active',
      story: '大壮是目前记录到的体型最大的雄性梅花鹿。他拥有一对令人印象深刻的三叉鹿角，颈部毛色明显深于其他个体。他通常在棒棰岛景区一带活动，作为该区域的"鹿王"，周围经常有几只母鹿和幼鹿跟随。'
    },
    {
      id: 3,
      name: '花花',
      code: 'DL-003',
      sex: '雌',
      age: '2-3岁',
      features: ['背部白色斑点特别密集', '左后腿有旧伤痕迹', '好奇心强'],
      firstSeen: '2025-04-01',
      location: '老虎滩附近山林',
      status: 'active',
      story: '花花因背部异常密集的白色斑点而得名，是所有已记录梅花鹿中花纹最漂亮的一只。尽管左后腿似乎有旧伤痕迹，但并不影响她的活动。她性格活泼，好奇心很强。'
    },
    {
      id: 4,
      name: '老稳',
      code: 'DL-004',
      sex: '雄',
      age: '7-8岁',
      features: ['鹿角有四个分叉', '面部有深色条纹', '行动沉稳'],
      firstSeen: '2025-02-28',
      location: '付家庄公园',
      status: 'active',
      story: '老稳是被识别出的年龄最大的雄性个体之一。他有着四叉的壮观鹿角和面部独特的深色条纹。行动总是不紧不慢，非常沉稳。他似乎已经习惯了人类的存在。'
    },
    {
      id: 5,
      name: '小跳',
      code: 'DL-005',
      sex: '雌',
      age: '1-2岁',
      features: ['幼鹿体型', '尾巴特别白', '动作敏捷活泼'],
      firstSeen: '2025-05-10',
      location: '滨海路森林公园',
      status: 'active',
      story: '小跳是一只年幼的梅花鹿，推测是小白的幼崽。她体型娇小，尾巴部分的毛色特别白，走路时总是蹦蹦跳跳的，充满活力。'
    },
    {
      id: 6,
      name: '独行侠',
      code: 'DL-006',
      sex: '雄',
      age: '4-5岁',
      features: ['左侧鹿角略短', '独来独往', '警觉性极高'],
      firstSeen: '2025-04-15',
      location: '南部海滨步道',
      status: 'active',
      story: '独行侠得名于他总是独自出没的习惯。与其他雄鹿不同，他很少和鹿群在一起。他的警觉性非常高，稍有动静就会迅速离开。'
    },
    {
      id: 7,
      name: '双双',
      code: 'DL-007',
      sex: '雌',
      age: '3-4岁',
      features: ['耳朵上各有对称小黑点', '经常与花花同行', '体态优美'],
      firstSeen: '2025-04-20',
      location: '老虎滩附近山林',
      status: 'active',
      story: '双双因两只耳朵上各有一个对称的小黑点而得名。她和花花似乎是"闺蜜"，经常一起活动。体态优美，步态从容。'
    },
    {
      id: 8,
      name: '星星',
      code: 'DL-008',
      sex: '未知',
      age: '1岁以下',
      features: ['额头有星形白斑', '极幼小', '总跟在母鹿身边'],
      firstSeen: '2025-06-01',
      location: '棒棰岛景区',
      status: 'unconfirmed',
      story: '星星是最近才被发现的幼鹿，因额头上有一个形似星星的白色斑纹而得名。目前还在观察确认中。'
    }
  ],

  observations: [
    {
      id: 1,
      deerId: 1,
      deerName: '小白',
      deerCode: 'DL-001',
      locationName: '滨海路森林公园东入口',
      lat: 38.8726,
      lng: 121.6015,
      observedAt: '2025-11-15T09:30',
      behaviorTags: ['觅食', '休息'],
      description: '清晨在步道旁的草地上觅食，状态良好，毛色光泽。约10分钟后卧在树下休息。',
      contributor: '鹿友小林',
      status: 'approved',
      createdAt: '2025-11-15'
    },
    {
      id: 2,
      deerId: 2,
      deerName: '大壮',
      deerCode: 'DL-002',
      locationName: '棒棰岛景区西侧山坡',
      lat: 38.8612,
      lng: 121.6543,
      observedAt: '2025-11-14T16:00',
      behaviorTags: ['行走', '警觉'],
      description: '傍晚时分在山坡上缓步行走，周围有3只母鹿。',
      contributor: '自然摄影阿杰',
      status: 'approved',
      createdAt: '2025-11-14'
    },
    {
      id: 3,
      deerId: 3,
      deerName: '花花',
      deerCode: 'DL-003',
      locationName: '老虎滩山林步道',
      lat: 38.8832,
      lng: 121.6234,
      observedAt: '2025-11-13T11:00',
      behaviorTags: ['觅食', '群居'],
      description: '与双双一起在山林步道附近觅食，对路过的登山者表现出好奇。',
      contributor: '山野行者',
      status: 'approved',
      createdAt: '2025-11-13'
    },
    {
      id: 4,
      deerId: 4,
      deerName: '老稳',
      deerCode: 'DL-004',
      locationName: '付家庄公园北坡',
      lat: 38.8698,
      lng: 121.5876,
      observedAt: '2025-11-12T07:00',
      behaviorTags: ['休息'],
      description: '清晨发现老稳独自在北坡的一块大石头旁卧着休息，面朝海的方向。',
      contributor: '晨跑小王',
      status: 'approved',
      createdAt: '2025-11-12'
    },
    {
      id: 5,
      deerId: 5,
      deerName: '小跳',
      deerCode: 'DL-005',
      locationName: '滨海路森林公园中段',
      lat: 38.8745,
      lng: 121.6048,
      observedAt: '2025-11-11T14:30',
      behaviorTags: ['行走', '哺育'],
      description: '小跳跟在小白身后蹦蹦跳跳地走着，中途还短暂哺乳了一次。',
      contributor: '鹿友小林',
      status: 'approved',
      createdAt: '2025-11-11'
    },
    {
      id: 6,
      deerId: 1,
      deerName: '小白',
      deerCode: 'DL-001',
      locationName: '滨海路森林公园西区',
      lat: 38.8718,
      lng: 121.5978,
      observedAt: '2025-11-10T10:15',
      behaviorTags: ['饮水'],
      description: '在西区的小溪边饮水，旁边还有一只未识别的幼鹿。',
      contributor: '自然摄影阿杰',
      status: 'approved',
      createdAt: '2025-11-10'
    },
    {
      id: 7,
      deerId: 6,
      deerName: '独行侠',
      deerCode: 'DL-006',
      locationName: '南部海滨步道观景台',
      lat: 38.8589,
      lng: 121.6123,
      observedAt: '2025-11-09T17:45',
      behaviorTags: ['行走', '警觉'],
      description: '日落时分在观景台附近独自行走。听到脚步声后快速消失在树丛中。',
      contributor: '步道巡查员',
      status: 'approved',
      createdAt: '2025-11-09'
    },
    {
      id: 8,
      deerId: 7,
      deerName: '双双',
      deerCode: 'DL-007',
      locationName: '老虎滩公园东侧',
      lat: 38.8845,
      lng: 121.6267,
      observedAt: '2025-11-08T08:30',
      behaviorTags: ['觅食', '群居'],
      description: '双双和花花在一起觅食，耳朵上的对称黑点非常明显。',
      contributor: '山野行者',
      status: 'approved',
      createdAt: '2025-11-08'
    },
    {
      id: 9,
      deerId: 2,
      deerName: '大壮',
      deerCode: 'DL-002',
      locationName: '棒棰岛景区入口',
      lat: 38.8625,
      lng: 121.651,
      observedAt: '2025-11-07T15:00',
      behaviorTags: ['休息', '群居'],
      description: '大壮带领一小群鹿在景区入口附近的林地里休息。',
      contributor: '游客李先生',
      status: 'approved',
      createdAt: '2025-11-07'
    },
    {
      id: 10,
      deerId: 3,
      deerName: '花花',
      deerCode: 'DL-003',
      locationName: '老虎滩北坡',
      lat: 38.886,
      lng: 121.621,
      observedAt: '2025-11-06T12:00',
      behaviorTags: ['奔跑'],
      description: '花花在北坡突然奔跑起来，跑动时左后腿旧伤恢复得不错。',
      contributor: '鹿友小林',
      status: 'approved',
      createdAt: '2025-11-06'
    },
    {
      id: 11,
      deerId: null,
      deerName: null,
      deerCode: null,
      locationName: '森林动物园周边',
      lat: 38.891,
      lng: 121.592,
      observedAt: '2025-11-16T14:00',
      behaviorTags: ['觅食', '行走'],
      description: '在森林动物园外围发现一只未见过的成年雌鹿，背部斑纹较稀疏，体型中等。',
      contributor: '新志愿者小美',
      status: 'pending',
      createdAt: '2025-11-16'
    },
    {
      id: 12,
      deerId: null,
      deerName: null,
      deerCode: null,
      locationName: '滨海路东段',
      lat: 38.877,
      lng: 121.615,
      observedAt: '2025-11-16T08:00',
      behaviorTags: ['觅食'],
      description: '早晨慢跑时看到一只年轻雄鹿在路边草丛觅食，鹿角还比较小。',
      contributor: '晨跑小王',
      status: 'pending',
      createdAt: '2025-11-16'
    },
    {
      id: 13,
      deerId: null,
      deerName: null,
      deerCode: null,
      locationName: '棒棰岛东海岸',
      lat: 38.86,
      lng: 121.66,
      observedAt: '2025-11-15T16:30',
      behaviorTags: ['饮水', '休息'],
      description: '在海岸边的淡水溪流旁发现两只鹿在饮水，一大一小，可能是母子。',
      contributor: '游客张女士',
      status: 'pending',
      createdAt: '2025-11-15'
    },
    {
      id: 14,
      deerId: null,
      deerName: null,
      deerCode: null,
      locationName: '付家庄海滩附近',
      lat: 38.868,
      lng: 121.59,
      observedAt: '2025-11-14T11:00',
      behaviorTags: ['行走'],
      description: '看到一只鹿从山上走下来，经过停车场附近。体型较大。',
      contributor: '匿名',
      status: 'pending',
      createdAt: '2025-11-14'
    },
    {
      id: 15,
      deerId: 8,
      deerName: '星星',
      deerCode: 'DL-008',
      locationName: '棒棰岛景区南侧',
      lat: 38.859,
      lng: 121.655,
      observedAt: '2025-11-13T09:00',
      behaviorTags: ['哺育', '群居'],
      description: '星星和疑似母鹿在一起，正在吃奶。额头的星形白斑非常清晰。',
      contributor: '自然摄影阿杰',
      status: 'approved',
      createdAt: '2025-11-13'
    }
  ],

  contributors: [
    { id: 1, name: '鹿友小林', points: 320, uploads: 12, reviews: 5, joined: '2025-03-20' },
    { id: 2, name: '自然摄影阿杰', points: 280, uploads: 9, reviews: 8, joined: '2025-03-25' },
    { id: 3, name: '山野行者', points: 150, uploads: 6, reviews: 2, joined: '2025-04-10' },
    { id: 4, name: '晨跑小王', points: 90, uploads: 4, reviews: 0, joined: '2025-05-01' },
    { id: 5, name: '步道巡查员', points: 200, uploads: 3, reviews: 15, joined: '2025-04-05' }
  ],

  // Helper: generate deer SVG avatar with unique coloring and patterns
  getDeerAvatar: function(deer) {
    var colors = [
      ['#E8D5B7', '#C4A882'],
      ['#C4A882', '#A08060'],
      ['#D4C5A9', '#B8A888'],
      ['#B8A07E', '#96805C'],
      ['#F0E6D3', '#D4C5A9'],
      ['#C9B896', '#A89870'],
      ['#DDD0B8', '#C0B090'],
      ['#EDE3D1', '#D4C5A9']
    ];
    var c = colors[(deer.id - 1) % colors.length];
    var isMale = deer.sex === '雄';
    var spots =
      deer.id % 2 === 0
        ? '<circle cx="35" cy="42" r="4" fill="white" opacity="0.6"/><circle cx="55" cy="38" r="3" fill="white" opacity="0.5"/><circle cx="45" cy="52" r="3.5" fill="white" opacity="0.55"/><circle cx="60" cy="50" r="3" fill="white" opacity="0.5"/><circle cx="40" cy="62" r="4" fill="white" opacity="0.45"/>'
        : '<circle cx="30" cy="40" r="3.5" fill="white" opacity="0.55"/><circle cx="50" cy="35" r="4" fill="white" opacity="0.6"/><circle cx="42" cy="48" r="3" fill="white" opacity="0.5"/><circle cx="62" cy="45" r="3.5" fill="white" opacity="0.55"/><circle cx="55" cy="58" r="3" fill="white" opacity="0.5"/>';
    var antlers = isMale
      ? '<line x1="36" y1="18" x2="28" y2="6" stroke="' +
        c[1] +
        '" stroke-width="2.5"/><line x1="28" y1="6" x2="22" y2="10" stroke="' +
        c[1] +
        '" stroke-width="2"/><line x1="28" y1="6" x2="26" y2="14" stroke="' +
        c[1] +
        '" stroke-width="2"/><line x1="64" y1="18" x2="72" y2="6" stroke="' +
        c[1] +
        '" stroke-width="2.5"/><line x1="72" y1="6" x2="78" y2="10" stroke="' +
        c[1] +
        '" stroke-width="2"/><line x1="72" y1="6" x2="74" y2="14" stroke="' +
        c[1] +
        '" stroke-width="2"/>'
      : '';
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="' +
      c[0] +
      '"/><ellipse cx="50" cy="55" rx="28" ry="22" fill="' +
      c[1] +
      '"/>' +
      spots +
      '<ellipse cx="50" cy="30" rx="14" ry="12" fill="' +
      c[1] +
      '"/><ellipse cx="42" cy="27" rx="3" ry="2.5" fill="#333"/><ellipse cx="58" cy="27" rx="3" ry="2.5" fill="#333"/><ellipse cx="50" cy="33" rx="2.5" ry="2" fill="#555"/><ellipse cx="38" cy="18" rx="4" ry="8" fill="' +
      c[1] +
      '" transform="rotate(-15 38 18)"/><ellipse cx="62" cy="18" rx="4" ry="8" fill="' +
      c[1] +
      '" transform="rotate(15 62 18)"/>' +
      antlers +
      '<line x1="35" y1="72" x2="32" y2="92" stroke="' +
      c[1] +
      '" stroke-width="3"/><line x1="45" y1="74" x2="43" y2="92" stroke="' +
      c[1] +
      '" stroke-width="3"/><line x1="55" y1="74" x2="57" y2="92" stroke="' +
      c[1] +
      '" stroke-width="3"/><line x1="65" y1="72" x2="68" y2="92" stroke="' +
      c[1] +
      '" stroke-width="3"/><text x="50" y="98" text-anchor="middle" font-size="7" fill="#555">' +
      deer.code +
      '</text></svg>';
    return 'data:image/svg+xml,' + encodeURIComponent(svg);
  },

  // Mock AI match function for unmatched observations
  mockAIMatch: function() {
    var shuffled = this.deer.slice().sort(function() {
      return Math.random() - 0.5;
    }).slice(0, 3);
    return shuffled
      .map(function(d, i) {
        return {
          deerId: d.id,
          name: d.name,
          code: d.code,
          similarity: Math.round((90 - i * 12 + Math.random() * 8) * 10) / 10,
          features: d.features.slice(0, 2).join('、')
        };
      })
      .sort(function(a, b) {
        return b.similarity - a.similarity;
      });
  },

  // Get statistics for dashboard
  getStats: function() {
    var d = this.deer,
      o = this.observations;
    return {
      totalDeer: d.filter(function(x) {
        return x.status === 'active';
      }).length,
      totalObs: o.filter(function(x) {
        return x.status === 'approved';
      }).length,
      totalContrib: this.contributors.length,
      pending: o.filter(function(x) {
        return x.status === 'pending';
      }).length
    };
  }
};
