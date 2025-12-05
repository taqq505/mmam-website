const { createApp } = Vue;

const translations = {
    en: {
        nav: {
            vision: 'Why MMAM',
            capabilities: 'Capabilities',
            stack: 'Stack',
            starter: 'Quick Start',
            showcase: 'Screens',
            guide: 'How to Use',
            demo: 'Live Demo',
            openRepo: 'GitHub'
        },
        hero: {
            badge: 'Open source IPAM for SMPTE ST 2110',
            title: 'Media Multicast Address Manager',
            subtitle: 'MMAM is a multicast-first IP address manager that unifies planning, NMOS integrations, audit history, and a flow search DB to link IP telemetry with source metadata for faster troubleshooting.',
            primary: 'Open GitHub repo',
            secondary: 'View quick start',
            demo: 'Try live demo',
            guide: 'Read HOW TO USE',
            screenshot: 'Planner Explorer highlighting reserved S/G/Port blocks',
            metrics: [
                { value: 'Flow DB', label: 'Bidirectional search', detail: 'Look up IPs from source metadata or find source metadata from IPs so ops and network teams decide faster' },
                { value: 'Message hub', label: 'Keyed annotations', detail: 'Share text threads per address or flow ID for BCC-style workflows' },
                { value: 'REST PATCH', label: 'Programmable', detail: 'Update existing flows and share keyed notes via API' }
            ],
            highlights: [
                { eyebrow: 'Multi-site', title: 'One planner for prod + backup', desc: 'Track S/G/Port assignments for both production and backup fabrics, so planned changes and turn-ups stay in sync.' },
                { eyebrow: 'Text hub', title: 'Shared annotations', desc: 'Alias and user-defined fields become keyed threads per multicast slot so BCC, ops, and monitoring share the same log.' },
                { eyebrow: 'NMOS onboarding', title: 'Register faster', desc: 'Discover IS-04/05 endpoints, compare device data, and apply patches without retyping addresses.' },
                { eyebrow: 'Automation', title: 'Manual + scheduled checks', desc: 'Run collision and NMOS checks on demand or schedule them, then pull the latest results via REST or MQTT if enabled.' }
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
            title: 'Multicast-specific IPAM backed by PostgreSQL, REST, and Vue UI',
            lead: 'MMAM keeps address planning, NMOS integration, and audit history in one source of truth so ST 2110 systems stay aligned, while the flow search DB links IP telemetry with source metadata for faster troubleshooting.',
            cards: [
                { title: 'Authoritative address map', desc: 'Planner buckets and the address map explorer document every S/G/Port block for production and backup fabrics.' },
                { title: 'API-first coordination', desc: 'REST PATCH endpoints update existing flows and share keyed notes instead of emailing spreadsheets.' },
                { title: 'Operators + networks share context', desc: 'Link IP-only telemetry with source metadata in the same DB so network engineers and operators know exactly which flow may be stopped.' },
                { title: 'Operational assurance', desc: 'Collision and NMOS drift checks run on the same stack, logging every detection for later review.' }
            ],
            blueprint: {
                title: 'Playbook',
                headline: 'Day-to-day workflow',
                desc: 'Blend the UI and API to keep multicast plans and downstream systems in sync.',
                items: [
                    'Annotate flows with alias/user fields and expose them as the shared text hub',
                    'Pull NMOS data, review differences, and apply patches back to devices directly from MMAM',
                    'Schedule collision and NMOS jobs so deviations are reported automatically'
                ]
            }
        },
        capabilities: {
            kicker: 'Capabilities',
            title: 'Multicast IPAM, API, and UI working together',
            lead: 'Use the PostgreSQL database, FastAPI services, and Vue UI as one toolkit for ST 2110 operations.',
            columns: [
                {
                    eyebrow: 'Address map',
                    title: 'Purpose-built planning',
                    items: [
                        'Planner buckets and views for each site, service, or backup fabric',
                        'Address map explorer visualizes S/G/Port blocks and occupancy',
                        'Collision checker surfaces duplicate multicast or port usage before it hits the air'
                    ]
                },
                {
                    eyebrow: 'Integrations',
                    title: 'REST + text hub',
                    items: [
                        'PATCH endpoints update existing flows without re-importing spreadsheets',
                        'Alias and user fields act as keyed text channels shared between BCC and monitoring systems',
                        'MQTT feed broadcasts flow updates for downstream automation'
                    ]
                },
                {
                    eyebrow: 'NMOS & automation',
                    title: 'Connect to devices',
                    items: [
                        'Discover IS-04/05 nodes and import flow definitions directly into MMAM',
                        'Apply NMOS parameters back to devices to avoid retyping addresses',
                        'Scheduler runs collision and NMOS drift jobs and records every alert'
                    ]
                }
            ],
            pillars: ['ST 2110', 'NMOS IS-04/05', 'FastAPI', 'PostgreSQL 16', 'Docker Compose', 'MQTT Bridge']
        },
        stack: {
            kicker: 'Architecture',
            title: 'Database + REST API + UI delivered together',
            lead: 'MMAM ships as docker compose with FastAPI services, PostgreSQL 16, and a Vue 3 console.',
            tiers: [
                {
                    label: 'FastAPI layer',
                    name: 'Control + automation',
                    desc: 'Handles REST endpoints, NMOS tooling, and scheduler workers.',
                    items: ['PATCH + checker routers', 'NMOS discovery and apply helpers', 'Scheduler with detailed audit logging']
                },
                {
                    label: 'PostgreSQL',
                    name: 'Data + text hub',
                    desc: 'Stores flows, planner buckets, and keyed annotations shared across systems.',
                    items: ['Normalized multicast and planner tables', 'Alias/user fields for text hub content', 'Scheduler + checker history tables']
                },
                {
                    label: 'Vue 3 UI',
                    name: 'Operations console',
                    desc: 'Planner, explorer, NMOS tools, and checker dashboards bundled offline.',
                    items: ['Planner and address map explorer', 'Flow editor with keyed text hub panel', 'Checker dashboard with automation status']
                }
            ],
            notes: [
                { title: 'Deployment', desc: 'Run `docker compose up --build` to seed the DB and UI with ready-to-use defaults.' },
                { title: 'Offline ready', desc: 'Vue, Tailwind, and MQTT vendor files are bundled locally for air-gapped labs.' },
                { title: 'REST + MQTT outputs', desc: 'Flow updates and checker alerts can be consumed over REST, MQTT, or both.' }
            ]
        },
        showcase: {
            kicker: 'Snapshots',
            title: 'Interface glimpses',
            lead: 'Preview how the UI exposes the planner, flows, and automation tools.',
            cards: [
                { title: 'Dashboard', preview: 'Open preview', image: 'images/dashboard.png', desc: 'Watcher cards summarise checker alerts, MQTT status, and automation jobs.' },
                { title: 'Search', preview: 'Open preview', image: 'images/Search.png', desc: 'Search flows across multicast, labels, or NMOS identifiers with instant filters.' },
                { title: 'Manual flow entry', preview: 'Open preview', image: 'images/Manual_flow_entry.png', desc: 'Create or edit flows with S/G/Port, redundancy legs, and keyed annotations.' },
                { title: 'NMOS wizard', preview: 'Open preview', image: 'images/NMOS_wizard.png', desc: 'Discover IS-04/05 nodes, compare device data, and apply patched settings.' },
                { title: 'Planner visualizer', preview: 'Open preview', image: 'images/Planner.png', desc: 'Address map explorer highlights reserved vs. free multicast blocks per site.' },
                { title: 'Checker dashboard', preview: 'Open preview', image: 'images/Checker.png', desc: 'Collision and NMOS drift runs with latest status, history, and job controls.' }
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
            copy: 'Copy command',
            copied: 'Copied!',
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
            vision: 'WHY MMAM',
            capabilities: '機能',
            stack: 'スタック',
            starter: 'クイックスタート',
            showcase: '画面',
            guide: 'HOW TO USE',
            demo: 'デモ',
            openRepo: 'GitHub'
        },
        hero: {
            badge: 'SMPTE ST 2110向けオープンソースフローデータベース',
            title: 'Media Multicast Address Manager',
            subtitle: 'MMAMはマルチキャストに特化したIPアドレスマネージャーです。アドレス計画、NMOS連携、監査ログを一元化し、IP情報と素材情報を即座に結び付けるフロー検索DBでトラブルシュートを加速します。',
            primary: 'GitHubを開く',
            secondary: 'クイックスタートを見る',
            demo: 'ライブデモを試す',
            guide: 'HOW TO USEを見る',
            screenshot: 'Planner / Address Mapの画面イメージ',
            metrics: [
                { value: 'フローデータベース', label: '双方向検索', detail: 'IPから素材情報、素材情報からIPをすぐに調べてトラブル対応を即決できます。' },
                { value: 'テキストハブ', label: 'テキスト共有', detail: 'アドレスやフローIDをキーにaliasなどの情報を保存可能' },
                { value: 'REST PATCH', label: '自動化', detail: '多彩なAPIを使用し独自の管理システムも構築可能' }
            ],
            highlights: [
                { eyebrow: '放送インフラ向け', title: 'ST 2022-7対応', desc: 'ST 2022-7 のプライマリー/セカンダリーアドレスをデュアルで管理し、どちらのパスでも同じ情報を参照できます。' },
                { eyebrow: 'テキストハブ', title: '共有メモ', desc: 'エイリアスやユーザーフィールドをフロー単位で管理し、システム間連携をスムーズに' },
                { eyebrow: 'NMOS連携', title: '登録作業を短縮', desc: 'IS-04/05から機器情報を取得して差分を確認し、そのままDBへ登録。' },
                { eyebrow: '自動チェック', title: '不整合を検出', desc: 'アドレス衝突やNMOS差分のチェック機能で、運用状態を常に把握。' }
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
            kicker: 'WHY MMAM',
            title: 'メディアマルチキャスト専用DBをワンスタックで提供',
            lead: 'PostgreSQL + REST API + Vue UIでアドレス計画とNMOS連携、監査履歴を一箇所に集約し、フロー検索DBがIPと素材情報を即座に結び付けることでST 2110運用の整合性と対応速度を高めます。',
            cards: [
                { title: '信頼できるアドレスマップ', desc: 'PlannerとAddress Mapでprimary/secondaryのマルチキャストアドレスを可視化し、状況を把握。' },
                { title: 'APIファースト連携', desc: 'REST PATCHで既存フローを更新し、変更点を他システムへ配信。' },
                { title: '運用とネットワークの橋渡し', desc: 'IP情報しか得られないネットワーク担当者と、素材視点の放送オペレーターが同じフローデータベースを参照し即断できます。' },
                { title: '運用保証', desc: 'コリジョンとNMOS差分チェックが同じ基盤で動作し、検出履歴を蓄積。' }
            ],
            blueprint: {
                title: 'プレイブック',
                headline: '運用例',
                desc: '常に最新の情報を持ったDBを中心にシステム連携を前提とした運用が構築できます。',
                items: [
                    'デコーダをはじめとした、日々フローの内容が変わるデバイスにalias情報を追加入力し、複数のBCCに情報を共有',
                    'システムを連携させ統合監視システムのダッシュボードにIPだけではなくフロー情報を表示',
                    'アドレスマップ機能で、空いているアドレスレンジを探し、システム拡張を容易にします。'
                ]
            }
        },
        capabilities: {
            kicker: '主要機能',
            title: 'マルチキャストDB・API・UIを一体で提供',
            lead: 'PostgreSQL + FastAPI + Vue UIを使い、ST 2110向けの計画と運用を一つのツールで完結させます。',
            columns: [
                {
                    eyebrow: 'アドレスマップ',
                    title: '計画の見える化',
                    items: [
                        '事前に計画したアドレスプールを保存し、使用率を視覚化',
                        'Address Mapでアドレスの割り当てと空き状況を一目で確認',
                        '衝突チェッカーで重複マルチキャストやポート使用を把握'
                    ]
                },
                {
                    eyebrow: '連携',
                    title: 'REST + テキストハブ + MQTT',
                    items: [
                        'REST PATCHで既存フローを再インポートせずに更新',
                        'エイリアス/ユーザー項目をキー付きテキストチャンネルとしてBCCや監視系へ共有',
                        'MQTT配信でフロー更新を自動化先へ通知'
                    ]
                },
                {
                    eyebrow: 'NMOSと自動化',
                    title: 'デバイスとつながる',
                    items: [
                        'IS-04/05ノードを検出してフロー定義を直接取り込み',
                        '登録されたデバイスは、いつでも再度 NMOS ノードへアクセスし、最新の情報を取得できます。',
                        'スケジューラで衝突/NMOS差分チェックを回し、アラートと履歴を記録'
                    ]
                }
            ],
            pillars: ['ST 2110', 'NMOS IS-04/05', 'FastAPI', 'PostgreSQL 16', 'Docker Compose', 'MQTT Bridge']
        },
        stack: {
            kicker: 'アーキテクチャ',
            title: 'DB + REST API + UIをまとめて提供',
            lead: 'docker composeひとつでFastAPIサービス、PostgreSQL 16、Vue 3 UIが立ち上がります。',
            tiers: [
                {
                    label: 'FastAPIレイヤー',
                    name: '制御と自動化',
                    desc: 'RESTエンドポイントやNMOSツール、スケジューラのワーカーを担当。',
                    items: ['PATCH/チェッカー用ルーター', 'NMOS検出・適用ヘルパー', 'スケジューラと監査ログ']
                },
                {
                    label: 'PostgreSQL',
                    name: 'データ + テキストハブ',
                    desc: 'フロー、Planner、共有メモを保存しシステム間で参照可能に。',
                    items: ['マルチキャスト/Plannerスキーマ', 'エイリアス・ユーザー項目にテキストハブを格納', 'スケジューラ/チェッカー履歴テーブル']
                },
                {
                    label: 'Vue 3 UI',
                    name: '運用コンソール',
                    desc: 'Planner・Explorer・NMOS・チェッカー画面をオフライン同梱。',
                    items: ['PlannerとAddress Map', 'テキストハブ付きフロー編集', '自動チェック結果ダッシュボード']
                }
            ],
            notes: [
                { title: 'デプロイ', desc: '`docker compose up --build`でDBとUIが初期化され、そのまま利用可能。' },
                { title: 'オフライン対応', desc: 'Vue/Tailwind/MQTTのベンダーファイルを同梱し、閉域環境でも動作。' },
                { title: '通知', desc: 'フロー更新やチェッカー結果をRESTやMQTTで取得可能。' }
            ]
        },
        showcase: {
            kicker: 'スナップショット',
            title: 'UIイメージ',
            lead: 'Planner/Flow/Checker機能をどのように見せるかをイメージできます。',
            cards: [
                { title: 'ダッシュボード', preview: 'クリックで拡大', image: 'images/dashboard.png', desc: 'チェッカーアラートやMQTT状態、Automationジョブのサマリを表示。' },
                { title: '検索', preview: 'クリックで拡大', image: 'images/Search.png', desc: 'マルチキャストやラベル、NMOS IDで即座にフローを検索。' },
                { title: '手動フロー登録', preview: 'クリックで拡大', image: 'images/Manual_flow_entry.png', desc: 'S/G/Portと冗長系、共有メモを入力してフローを作成・編集。' },
                { title: 'NMOS登録ウィザード', preview: 'クリックで拡大', image: 'images/NMOS_wizard.png', desc: 'IS-04/05ノードを検出し、差分比較から適用までウィザード化。' },
                { title: '可視化 (Address Map)', preview: 'クリックで拡大', image: 'images/Planner.png', desc: 'Planner/Explorerで予約済みと空きアドレスブロックを視覚化。' },
                { title: 'チェッカーダッシュボード', preview: 'クリックで拡大', image: 'images/Checker.png', desc: '衝突とNMOS自動チェックの最新結果と履歴をモニタリング。' }
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
            copy: 'コピー',
            copied: 'コピー済み',
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
