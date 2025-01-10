# tracker-sdk
前端流量统计和埋点分析系统JS SDK

## 功能
- 支持流量上报
- 支持埋点上报


## 本地开发
### 环境要求
* Node版本≥15.0.0

### 安装依赖
```bash
npm install --registry=https://registry.npmmirror.com
```

### 本地开发
```bash
# 启动SDK开发
yarn dev

# 启动SDK静态资源服务
预装 http-server npm
npm run start:dist-server

```

### 构建打包
版本号控制在：`package.json -> version`，如果涉及大版本更新，可以使用版本号区分，因为版本会存储在数据库中，后续可以根据版本号做对应的统计分析处理。
```bash
$ npm run build
```


采用script标签引入的方式

```html
<script src="https://xxxxx/tracker-sdk.min.js"></script>
<script>
  window.tracker = new Tracker({
    // tracker自定义名称 默认tracker 非必填
    name: 'tracker',
    // 后端api host
    host: 'xxxxxxx',
    // 前端埋点上报路由
    reportPath: '/track/create',
    // 应用客户端ID 
    clientId: 'xxxxx',
    // 获取用户token信息
    authorization: () => { 
      return '1231232132'
    },
    // 是否开启全局PV自动上报，默认：开启
    enableGlobalPvEvent: true,
    // 是否开启全局埋点点击事件自动上报，默认：关闭
    enableGlobalClickEvent: true,
    // 是否开启debug日志，默认：关闭
    debug: false,
    // 上报信息host黑名单 比如http:localhost 非必填
    reportHostBlacklist: [],
    // 自定义埋点name属性key 非必填
    attributeNameKey: 'tracker-name',
    // 自定义埋点category属性key 非必填
    attributeCategoryKey: 'tracker-category',
  });
</script>
```

### React
useTracker Hook：
```js
import { useCallback } from "react";

// 自定义 Hook 封装埋点逻辑
export const useTracker = () => {
  const waitTrackerInit = async () => {
    if (window.tracker) {
      return window.tracker;
    }
    let cnt = 10;
    while (cnt > 0) {
      await sleep(500);
      if (window.tracker) {
        break;
      }
      cnt--;
    }
    return window.tracker;
  }

  const trackEvent = useCallback(
    async (eventType: IEventType, data: ITrackData) => {
      const tracker = await waitTrackerInit();
      tracker?.track(eventType, data);
    },
    [],
  );

  return trackEvent;
};
```

使用方法：
```javascript
import { useEffect, useState } from 'react'
import { Button, Tabs } from 'antd'
import useMoliTracker from './hooks/useMoliTracker';

const { TabPane } = Tabs;

function TabsComponent() {
  const [activeKey, setActiveKey] = useState('签约目标达成概况');
  const trackEvent = useMoliTracker();
  const onChange = (key) => {
    setActiveKey(key)
  };
  
  useEffect(() => {
    // 手动点击上报
    trackEvent(
      'click', 
      { category: '销售周报数据手动埋点类目', name: activeKey }
    )
  }, [activeKey, trackEvent])

  

  return (
    <div track-category="测试category">
      <Tabs
        activeKey={activeKey}
        onChange={onChange}
        destroyInactiveTabPane
      >
        <TabPane
          key="1"
          tab="2"
        >                                 
          <Button
            type="dashed"
            track-category="1"
            track-name="1"
          >
            查询
          </Button>
        </TabPane>
        <TabPane
          tab="完工+毛利+回款"
          key="完工+毛利+回款"
        >
          <Button
            type="dashed"
            track-name="2"
          >
            1
          </Button>
        </TabPane>
        <TabPane
          tab="过程指标情况"
          key="过程指标情况"
        >
          <Button
            type="dashed"
          >
            2
          </Button>
        </TabPane>
      </Tabs>
    </div>
  );
}
```