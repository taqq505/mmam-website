// MMAM Website - Vue 3 Application with i18n

const { createApp } = Vue;

// Translation Data
const translations = {
    en: {
        nav: {
            home: 'home',
            features: 'features',
            screenshots: 'screenshots',
            quickstart: 'quickstart'
        },
        hero: {
            title: 'Media Multicast Address Manager',
            subtitle: 'Open Source Multicast IPAM for SMPTE ST 2110 Broadcast Networks',
            viewGithub: 'View on GitHub',
            getStarted: 'Get Started'
        },
        problem: {
            title: 'Common Challenges in ST 2110 Environments',
            subtitle: 'Broadcasting facilities face critical address management issues',
            items: [
                {
                    title: 'Multicast Address Collisions',
                    desc: 'Manual management often leads to duplicate address assignments causing network conflicts'
                },
                {
                    title: 'Excel Spreadsheet Hell',
                    desc: 'Tracking flows across multiple spreadsheets becomes error-prone and unmanageable'
                },
                {
                    title: 'S/G/Port vs SDP/NMOS Mismatch',
                    desc: 'Difficult to maintain consistency between network configuration and control plane'
                },
                {
                    title: 'Operational Visibility Gap',
                    desc: 'During operations, identifying which flow uses which address is time-consuming'
                }
            ],
            solution: 'MMAM Solves These Problems',
            solutionDesc: 'MMAM provides a centralized database for multicast address management, automatic collision detection, SDP file parsing, NMOS integration, and REST API for external system integration.'
        },
        features: {
            title: 'Key Features',
            subtitle: 'Comprehensive toolkit for broadcast IP operations',
            items: [
                {
                    title: 'ST 2110 Address Management',
                    desc: 'Manage multicast addresses per flow with S, G, Port tracking',
                    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                },
                {
                    title: 'SDP & NMOS Integration',
                    desc: 'Import SDP files, integrate with NMOS IS-04/05 controllers',
                    icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
                },
                {
                    title: 'Collision Detection',
                    desc: 'Automatic detection of duplicate multicast addresses',
                    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                },
                {
                    title: 'A/B Redundancy Support',
                    desc: 'SMPTE 2022-7 redundant flow configuration management',
                    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                },
                {
                    title: 'REST API',
                    desc: 'External system integration via comprehensive REST API',
                    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
                },
                {
                    title: 'Docker Deployment',
                    desc: 'Easy deployment with docker-compose (FastAPI + PostgreSQL + UI)',
                    icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01'
                }
            ]
        },
        architecture: {
            title: 'Architecture & Tech Stack',
            subtitle: 'Modern, maintainable technology stack',
            placeholder: 'Architecture diagram placeholder (will be replaced with actual image)'
        },
        screenshots: {
            title: 'Screenshots & Demo',
            subtitle: 'Intuitive web interface for flow management',
            items: [
                {
                    title: 'Flow List View',
                    desc: 'Comprehensive flow listing with search and filtering',
                    placeholder: 'Flow list screenshot placeholder'
                },
                {
                    title: 'Flow Edit Form',
                    desc: 'Detailed editing interface with validation',
                    placeholder: 'Edit form screenshot placeholder'
                },
                {
                    title: 'Address Block Planner',
                    desc: 'Visual address space planning and allocation',
                    placeholder: 'Planner screenshot placeholder'
                },
                {
                    title: 'Collision Checker',
                    desc: 'Real-time collision detection and reporting',
                    placeholder: 'Checker screenshot placeholder'
                }
            ]
        },
        quickstart: {
            title: 'Quick Start',
            subtitle: 'Get up and running in minutes',
            steps: [
                {
                    title: 'Clone the repository',
                    desc: 'Get the latest version from GitHub',
                    code: 'git clone https://github.com/taqq505/mmam-docker.git\ncd mmam-docker'
                },
                {
                    title: 'Configure environment',
                    desc: 'Copy and edit .env file',
                    code: 'cp .env.example .env\n# Edit POSTGRES_*, SECRET_KEY, etc.'
                },
                {
                    title: 'Start containers',
                    desc: 'Launch with docker-compose',
                    code: 'docker compose up --build'
                },
                {
                    title: 'Access UI',
                    desc: 'Open browser and login',
                    code: '# HTTP: http://localhost:4173\n# HTTPS: https://localhost:4174\n# Login: admin / admin'
                }
            ],
            more: 'For detailed setup instructions, see the '
        },
        usecases: {
            title: 'Use Cases & Target Users',
            subtitle: 'Who benefits from MMAM',
            items: [
                {
                    title: 'Broadcast Facility Technical Teams',
                    desc: 'Managing multicast addresses for ST 2110 production networks'
                },
                {
                    title: 'System Integrators',
                    desc: 'Designing and documenting IP address plans for new deployments'
                },
                {
                    title: 'Lab & Testing Environments',
                    desc: 'Address management during ST 2110 equipment validation'
                },
                {
                    title: 'Control System Integration',
                    desc: 'Central IPAM for NMOS controllers and SDN orchestration'
                }
            ]
        },
        community: {
            title: 'Community & Contribute',
            subtitle: 'Join the MMAM open source project',
            desc: 'MMAM is an open source project. We welcome contributions via GitHub Issues and Pull Requests.',
            reportIssue: 'Report an Issue',
            contributePR: 'Submit a Pull Request',
            license: 'License: MIT License - Free for commercial and personal use'
        },
        footer: {
            rights: 'All rights reserved.',
            license: 'License'
        }
    },
    ja: {
        nav: {
            home: 'ホーム',
            features: '機能',
            screenshots: 'スクリーンショット',
            quickstart: 'クイックスタート'
        },
        hero: {
            title: 'メディアマルチキャストアドレスマネージャー',
            subtitle: 'SMPTE ST 2110放送ネットワーク向けオープンソースマルチキャストIPAM',
            viewGithub: 'GitHubで見る',
            getStarted: '始める'
        },
        problem: {
            title: 'ST 2110環境でのよくある課題',
            subtitle: '放送局が直面する重要なアドレス管理の問題',
            items: [
                {
                    title: 'マルチキャストアドレスの衝突',
                    desc: '手動管理により重複したアドレス割り当てが発生し、ネットワーク障害の原因に'
                },
                {
                    title: 'Excelスプレッドシート地獄',
                    desc: '複数のスプレッドシートでフローを管理すると、エラーが発生しやすく管理不能に'
                },
                {
                    title: 'S/G/Port と SDP/NMOS の不一致',
                    desc: 'ネットワーク設定とコントロールプレーン間の一貫性維持が困難'
                },
                {
                    title: '運用時の可視性不足',
                    desc: 'どのフローがどのアドレスを使用しているか特定するのに時間がかかる'
                }
            ],
            solution: 'MMAMがこれらを解決',
            solutionDesc: 'MMAMは、マルチキャストアドレス管理のための集中データベース、自動衝突検出、SDPファイル解析、NMOS統合、外部システム連携用REST APIを提供します。'
        },
        features: {
            title: '主要機能',
            subtitle: '放送IP運用のための包括的なツールキット',
            items: [
                {
                    title: 'ST 2110アドレス管理',
                    desc: 'フロー単位でS, G, Portを追跡するマルチキャストアドレス管理',
                    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                },
                {
                    title: 'SDP & NMOS統合',
                    desc: 'SDPファイルのインポート、NMOS IS-04/05コントローラとの統合',
                    icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4'
                },
                {
                    title: 'コリジョン検出',
                    desc: '重複マルチキャストアドレスの自動検出',
                    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                },
                {
                    title: 'A/B冗長対応',
                    desc: 'SMPTE 2022-7冗長フロー構成管理',
                    icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                },
                {
                    title: 'REST API',
                    desc: '包括的なREST APIによる外部システム統合',
                    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
                },
                {
                    title: 'Dockerデプロイ',
                    desc: 'docker-composeで簡単デプロイ（FastAPI + PostgreSQL + UI）',
                    icon: 'M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01'
                }
            ]
        },
        architecture: {
            title: 'アーキテクチャと技術スタック',
            subtitle: 'モダンで保守しやすい技術スタック',
            placeholder: 'アーキテクチャ図のプレースホルダー（実際の画像に差し替え予定）'
        },
        screenshots: {
            title: 'スクリーンショットとデモ',
            subtitle: '直感的なWebインターフェースでフロー管理',
            items: [
                {
                    title: 'フロー一覧表示',
                    desc: '検索とフィルタリング機能を備えた包括的なフロー一覧',
                    placeholder: 'フロー一覧のスクリーンショットプレースホルダー'
                },
                {
                    title: 'フロー編集フォーム',
                    desc: 'バリデーション付き詳細編集インターフェース',
                    placeholder: '編集フォームのスクリーンショットプレースホルダー'
                },
                {
                    title: 'アドレスブロックプランナー',
                    desc: 'アドレス空間の可視化計画と割り当て',
                    placeholder: 'プランナーのスクリーンショットプレースホルダー'
                },
                {
                    title: 'コリジョンチェッカー',
                    desc: 'リアルタイムコリジョン検出とレポート',
                    placeholder: 'チェッカーのスクリーンショットプレースホルダー'
                }
            ]
        },
        quickstart: {
            title: 'クイックスタート',
            subtitle: '数分で起動して実行',
            steps: [
                {
                    title: 'リポジトリをクローン',
                    desc: 'GitHubから最新版を取得',
                    code: 'git clone https://github.com/taqq505/mmam-docker.git\ncd mmam-docker'
                },
                {
                    title: '環境設定',
                    desc: '.envファイルをコピーして編集',
                    code: 'cp .env.example .env\n# POSTGRES_*, SECRET_KEY などを編集'
                },
                {
                    title: 'コンテナを起動',
                    desc: 'docker-composeで起動',
                    code: 'docker compose up --build'
                },
                {
                    title: 'UIにアクセス',
                    desc: 'ブラウザを開いてログイン',
                    code: '# HTTP: http://localhost:4173\n# HTTPS: https://localhost:4174\n# ログイン: admin / admin'
                }
            ],
            more: '詳細なセットアップ手順は '
        },
        usecases: {
            title: 'ユースケースと対象ユーザー',
            subtitle: 'MMAMが役立つシーン',
            items: [
                {
                    title: '放送局技術部門',
                    desc: 'ST 2110プロダクションネットワークのマルチキャストアドレス管理'
                },
                {
                    title: 'システムインテグレータ',
                    desc: '新規導入のIPアドレスプラン設計と文書化'
                },
                {
                    title: 'ラボ・検証環境',
                    desc: 'ST 2110機器検証時のアドレス管理'
                },
                {
                    title: '制御システム統合',
                    desc: 'NMOSコントローラとSDNオーケストレーションの中核IPAM'
                }
            ]
        },
        community: {
            title: 'コミュニティと貢献',
            subtitle: 'MMAMオープンソースプロジェクトに参加',
            desc: 'MMAMはオープンソースプロジェクトです。GitHub IssuesとPull Requestを通じた貢献を歓迎します。',
            reportIssue: 'Issueを報告',
            contributePR: 'Pull Requestを送信',
            license: 'ライセンス: MITライセンス - 商用・個人利用ともに無料'
        },
        footer: {
            rights: 'All rights reserved.',
            license: 'ライセンス'
        }
    }
};

// Create Vue App
createApp({
    data() {
        return {
            lang: 'en',
            t: translations.en
        };
    },
    methods: {
        toggleLanguage() {
            this.lang = this.lang === 'en' ? 'ja' : 'en';
            this.t = translations[this.lang];
            localStorage.setItem('mmam-lang', this.lang);
        },
        detectLanguage() {
            // Check localStorage first
            const saved = localStorage.getItem('mmam-lang');
            if (saved && translations[saved]) {
                this.lang = saved;
                this.t = translations[this.lang];
                return;
            }

            // Detect browser language
            const browserLang = navigator.language || navigator.userLanguage;
            if (browserLang.startsWith('ja')) {
                this.lang = 'ja';
                this.t = translations.ja;
            }
        }
    },
    mounted() {
        this.detectLanguage();
    }
}).mount('#app');
