const { createApp } = Vue;

const translations = {
    en: {
        nav: {
            vision: 'Why MMAM',
            capabilities: 'Capabilities',
            stack: 'Stack',
            starter: 'Quick Start',
            showcase: 'Screens',
            openRepo: 'GitHub'
        },
        hero: {
            badge: 'Open source IPAM for SMPTE ST 2110',
            title: 'Reclaim control of every multicast slot',
            subtitle: 'MMAM centralizes address planning, NMOS integrations, and operational audits so broadcast teams can move fast without collisions.',
            primary: 'Open GitHub repo',
            secondary: 'View quick start',
            metrics: [
                { value: '65K+', label: 'Addresses modeled', detail: 'Dual-site reference plan included' },
                { value: '24/7', label: 'Operational visibility', detail: 'REST + MQTT streaming feeds' },
                { value: '<5 min', label: 'Fresh deployments', detail: 'Docker compose bootstrap workflow' }
            ],
            highlights: [
                { eyebrow: 'Operations', title: 'Live status snapshots', desc: 'See multicast usage per service group with enforced A/B legs and validation.' },
                { eyebrow: 'Integrations', title: 'NMOS aware', desc: 'Sync IS-04/05 controllers, parse SDP payloads, and auto-populate flow metadata.' },
                { eyebrow: 'Governance', title: 'Change tracking', desc: 'Every import, edit, and API call is logged for audits and rollbacks.' }
            ],
            panel: {
                title: 'Included services',
                desc: 'Everything ships inside docker compose out of the box.',
                items: [
                    'FastAPI control plane',
                    'PostgreSQL 16 datastore',
                    'Vue 3 management UI',
                    'Webhook + MQTT bridge'
                ],
                footer: 'Secure defaults ready for override via environment variables.'
            }
        },
        vision: {
            kicker: 'Why teams adopt MMAM',
            title: 'Purpose-built for broadcast scale IP operations',
            lead: 'Stop patching spreadsheets. Model your network once, share a living address book, and let MMAM guard every change.',
            cards: [
                { title: 'Human-friendly planning', desc: 'Block out source/group/port definitions while checking against reserved pools in real time.' },
                { title: 'Eliminate spreadsheet debt', desc: 'Template address books and distribute them as API-first artifacts controlled by roles.' },
                { title: 'Confident migrations', desc: 'Mirror legacy control systems, compare deltas, and validate before you flip program feeds.' }
            ],
            blueprint: {
                title: 'Playbook',
                headline: 'Operational blueprint',
                desc: 'Use MMAM as the living record of your ST 2110 environment.',
                items: [
                    'Map NMOS resources to multicast slots with annotations',
                    'Run collision checks before on-air maintenance',
                    'Schedule JSON exports for orchestration tools'
                ]
            }
        },
        capabilities: {
            kicker: 'Capabilities',
            title: 'Automatic guardrails for every flow',
            lead: 'Design, audit, and publish multicast data without leaving the browser.',
            columns: [
                {
                    eyebrow: 'Address intelligence',
                    title: 'Plan with intent',
                    items: [
                        'Reserve ranges per production, lab, or event',
                        'Automatic collision flagging with context',
                        'Multi-site A/B legs aware of SMPTE 2022-7'
                    ]
                },
                {
                    eyebrow: 'Automation',
                    title: 'Instrument everything',
                    items: [
                        'REST + MQTT streaming for external tooling',
                        'SDP ingest with schema validation',
                        'Role-based UI powered by Vue 3'
                    ]
                },
                {
                    eyebrow: 'Operations',
                    title: 'Support the floor',
                    items: [
                        'Search flows by source, group, or port',
                        'Change log with diffs and attribution',
                        'Export documentation packs instantly'
                    ]
                }
            ],
            pillars: ['ST 2110', 'NMOS IS-04/05', 'FastAPI', 'PostgreSQL 16', 'Docker Compose', 'MQTT Bridge']
        },
        stack: {
            kicker: 'Architecture',
            title: 'Composable stack tuned for broadcast',
            lead: 'Delivered as docker compose with sane defaults and observability hooks already wired.',
            tiers: [
                {
                    label: 'Control plane',
                    name: 'FastAPI services',
                    desc: 'Manages address lifecycle, rules, and APIs.',
                    items: ['Token-secured REST endpoints', 'Workers for imports + validation', 'Auditable change queue']
                },
                {
                    label: 'Data layer',
                    name: 'PostgreSQL 16',
                    desc: 'Schema optimized for multicast reservations and history.',
                    items: ['Immutable audit tables', 'JSONB metadata for custom tags', 'Snapshot jobs via cron container']
                },
                {
                    label: 'Interfaces',
                    name: 'Vue 3 / Vite UI',
                    desc: 'Dark themed console with shortcuts for power users.',
                    items: ['Flow table with deep filters', 'Inline NMOS discovery results', 'Diff review before publishing']
                }
            ],
            notes: [
                { title: 'Deployment', desc: 'Run `docker compose up --build` and the stack configures itself.' },
                { title: 'Extensibility', desc: 'Extend the FastAPI routers or drop in webhook consumers tailored to your plant.' },
                { title: 'Security', desc: 'Sample HTTPS reverse proxy and secret rotation guidance included.' }
            ]
        },
        showcase: {
            kicker: 'Snapshots',
            title: 'Interface glimpses',
            lead: 'Placeholder mockups showing how MMAM surfaces the right information.',
            cards: [
                { title: 'Flow matrix', desc: 'At-a-glance availability for every multicast block across sites.' },
                { title: 'Change proposals', desc: 'Stage edits, compare, then publish to NMOS controllers once approved.' },
                { title: 'Audit timeline', desc: 'Track who touched what, including API callers and webhook deliveries.' },
                { title: 'Capacity planning', desc: 'Visualize reserved vs. free ranges to prep new productions.' }
            ]
        },
        quickstart: {
            kicker: 'Deploy',
            title: 'Quick start workflow',
            lead: 'From clone to operational UI in four simple steps.',
            steps: [
                { title: 'Clone repository', desc: 'Grab the latest docker distribution of MMAM.', code: 'git clone https://github.com/taqq505/mmam-docker.git\ncd mmam-docker' },
                { title: 'Configure secrets', desc: 'Copy the example env file and set database + app secrets.', code: 'cp .env.example .env\n# Edit POSTGRES_*, SECRET_KEY, etc.' },
                { title: 'Build and start', desc: 'Run docker compose to build the images and boot services.', code: 'docker compose up --build' },
                { title: 'Sign in', desc: 'Open the UI and use the default admin credentials.', code: '# http://localhost:4173\n# https://localhost:4174\n# admin / admin' }
            ],
            note: 'Need more context? Review the',
            noteLink: 'GitHub README'
        },
        cta: {
            kicker: 'Community',
            title: 'Ready to deploy MMAM?',
            desc: 'Use it internally, fork it, or help shape the roadmap with feedback.',
            primary: 'Clone the repo',
            secondary: 'Open an issue'
        },
        footer: {
            tagline: 'Media Multicast Address Manager for ST 2110 networks.',
            license: 'License',
            rights: 'All rights reserved.'
        }
    },
    ja: {
        nav: {
            vision: 'MMAMが選ばれる理由',
            capabilities: '機能',
            stack: 'スタック',
            starter: 'クイックスタート',
            showcase: '画面',
            openRepo: 'GitHub'
        },
        hero: {
            badge: 'SMPTE ST 2110向けオープンソースIPAM',
            title: 'すべてのマルチキャストスロットを掌握する',
            subtitle: 'MMAMはアドレス計画、NMOS連携、監査ログを一元化し、放送チームが衝突を気にせず高速に作業できるようにします。',
            primary: 'GitHubを開く',
            secondary: 'クイックスタートを見る',
            metrics: [
                { value: '65K+', label: 'モデリング済みアドレス', detail: '2サイト構成のリファレンスプラン付属' },
                { value: '24/7', label: '可視化', detail: 'RESTとMQTTでリアルタイム配信' },
                { value: '<5分', label: '初回起動', detail: 'docker composeだけで完了' }
            ],
            highlights: [
                { eyebrow: '運用', title: 'ライブ状況スナップショット', desc: 'サービスグループごとの使用状況とA/B系統を検証しながら把握できます。' },
                { eyebrow: '連携', title: 'NMOSネイティブ', desc: 'IS-04/05と同期し、SDP情報を自動解析してメタデータを生成します。' },
                { eyebrow: 'ガバナンス', title: '変更トラッキング', desc: '取り込み・編集・API呼び出しをすべて記録し、監査と差分確認を簡単にします。' }
            ],
            panel: {
                title: '同梱サービス',
                desc: 'docker composeひとつで全コンポーネントが起動します。',
                items: [
                    'FastAPI制御プレーン',
                    'PostgreSQL 16データストア',
                    'Vue 3管理UI',
                    'Webhook + MQTTブリッジ'
                ],
                footer: '環境変数で上書きできる安全なデフォルト設定。'
            }
        },
        vision: {
            kicker: '導入理由',
            title: '放送規模のIP運用に最適化',
            lead: 'スプレッドシートをつぎはぎする時代は終わりです。MMAMでライブなアドレス帳を共有し、すべての変更を保護します。',
            cards: [
                { title: '現場目線の計画', desc: 'ソース/グループ/ポートを定義しながら予約済みプールを即時チェック。' },
                { title: 'スプレッドシートから脱却', desc: 'テンプレート化したアドレス帳をAPIファーストで配布し、権限ごとに管理。' },
                { title: '安心の移行', desc: '既存制御システムを写し取り、差分を比較してから本番切替へ進めます。' }
            ],
            blueprint: {
                title: 'プレイブック',
                headline: '運用の設計図',
                desc: 'MMAMをST 2110ネットワークの生きた記録として活用します。',
                items: [
                    'NMOSリソースを注釈付きでマルチキャストに紐づけ',
                    'オンエア保守前に衝突チェックを実行',
                    'オーケストレーション向けJSONエクスポートをスケジュール'
                ]
            }
        },
        capabilities: {
            kicker: '主要機能',
            title: 'すべてのフローに自動ガードレール',
            lead: 'ブラウザだけで設計・監査・公開まで完結します。',
            columns: [
                {
                    eyebrow: 'アドレスインテリジェンス',
                    title: '意図を持って計画',
                    items: [
                        '番組・ラボ・イベントごとにレンジを予約',
                        '背景情報付きの自動衝突アラート',
                        'SMPTE 2022-7対応のマルチサイトA/B管理'
                    ]
                },
                {
                    eyebrow: '自動化',
                    title: 'すべてを計測',
                    items: [
                        '外部ツール向けREST + MQTT配信',
                        'SDP取り込みとスキーマ検証',
                        'Vue 3ベースのロール管理UI'
                    ]
                },
                {
                    eyebrow: '運用支援',
                    title: 'フロアをサポート',
                    items: [
                        'ソース・グループ・ポートで高速検索',
                        '差分付き変更ログと担当者追跡',
                        'ドキュメントパックを即時エクスポート'
                    ]
                }
            ],
            pillars: ['ST 2110', 'NMOS IS-04/05', 'FastAPI', 'PostgreSQL 16', 'Docker Compose', 'MQTT Bridge']
        },
        stack: {
            kicker: 'アーキテクチャ',
            title: '放送向けに調整されたコンポーザブルスタック',
            lead: '標準のdocker composeでデフォルト設定と監視フックまで提供します。',
            tiers: [
                {
                    label: '制御プレーン',
                    name: 'FastAPIサービス群',
                    desc: 'アドレスライフサイクルとルール、APIを統括。',
                    items: ['トークン保護されたRESTエンドポイント', '取り込みと検証のワーカー', '監査可能な変更キュー']
                },
                {
                    label: 'データ層',
                    name: 'PostgreSQL 16',
                    desc: 'マルチキャスト予約と履歴に最適化したスキーマ。',
                    items: ['改ざん不可の監査テーブル', 'タグ用JSONBメタデータ', 'cronコンテナによるスナップショット']
                },
                {
                    label: 'インターフェース',
                    name: 'Vue 3 / Vite UI',
                    desc: 'キーボードショートカットを備えたダークテーマコンソール。',
                    items: ['高度なフィルタを備えたフロー表', 'NMOSディスカバリ結果をインライン表示', '公開前の差分チェック']
                }
            ],
            notes: [
                { title: 'デプロイ', desc: '`docker compose up --build`だけで自動構成されます。' },
                { title: '拡張性', desc: 'FastAPIルーターの拡張やWebhookコンシューマーの追加も容易。' },
                { title: 'セキュリティ', desc: 'HTTPSリバースプロキシのサンプルとシークレット更新手順を同梱。' }
            ]
        },
        showcase: {
            kicker: 'スナップショット',
            title: 'UIイメージ',
            lead: 'プレースホルダーでも画面構成のニュアンスを感じ取れます。',
            cards: [
                { title: 'フローマトリクス', desc: 'サイトを跨いだマルチキャストブロックの空き状況を即確認。' },
                { title: '変更提案', desc: 'NMOS配信前に編集内容をステージングして比較。' },
                { title: '監査タイムライン', desc: 'API呼び出しやWebhook配信も含めて誰が何をしたか追跡。' },
                { title: 'キャパシティ計画', desc: '予約済みと空きレンジをビジュアルで把握。' }
            ]
        },
        quickstart: {
            kicker: '導入',
            title: 'クイックスタート手順',
            lead: 'クローンからUI稼働まで4ステップ。',
            steps: [
                { title: 'リポジトリをクローン', desc: 'MMAMの最新docker配布物を取得します。', code: 'git clone https://github.com/taqq505/mmam-docker.git\ncd mmam-docker' },
                { title: 'シークレット設定', desc: 'サンプルenvをコピーしてDBやアプリの値を記入。', code: 'cp .env.example .env\n# POSTGRES_*, SECRET_KEY など' },
                { title: 'ビルドして起動', desc: 'docker composeでビルド・起動。', code: 'docker compose up --build' },
                { title: 'サインイン', desc: 'UIを開き、既定の管理者アカウントでログイン。', code: '# http://localhost:4173\n# https://localhost:4174\n# admin / admin' }
            ],
            note: '詳しくは',
            noteLink: 'GitHub README'
        },
        cta: {
            kicker: 'コミュニティ',
            title: 'MMAMを今すぐ導入しませんか',
            desc: '社内利用でもフォークでも歓迎。フィードバックでロードマップづくりに参加できます。',
            primary: 'リポジトリをクローン',
            secondary: 'Issueを投稿'
        },
        footer: {
            tagline: 'SMPTE ST 2110ネットワーク向けMedia Multicast Address Manager。',
            license: 'ライセンス',
            rights: 'All rights reserved.'
        }
    }
};

createApp({
    data() {
        return {
            lang: 'en',
            t: translations.en,
            menuOpen: false
        };
    },
    methods: {
        toggleLanguage() {
            this.lang = this.lang === 'en' ? 'ja' : 'en';
            this.t = translations[this.lang];
            localStorage.setItem('mmam-lang', this.lang);
            this.menuOpen = false;
        },
        detectLanguage() {
            const saved = localStorage.getItem('mmam-lang');
            if (saved && translations[saved]) {
                this.lang = saved;
                this.t = translations[this.lang];
                return;
            }

            const browserLang = navigator.language || navigator.userLanguage;
            if (browserLang && browserLang.toLowerCase().startsWith('ja')) {
                this.lang = 'ja';
                this.t = translations.ja;
            }
        },
        handleResize() {
            if (window.innerWidth > 960 && this.menuOpen) {
                this.menuOpen = false;
            }
        }
    },
    mounted() {
        this.detectLanguage();
        window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    }
}).mount('#app');
