import { ProjectItemProps } from '../types/projects';

export const PROJECTS_DATA: ProjectItemProps[] = [
  {
    title: 'Expanse - AI Finance Tracker',
    slug: 'ai-finance-tracker',
    description:
      'A Telegram-based personal finance assistant that uses AI to turn natural language messages into structured income and expense records.',
    image: '/images/placeholder.png',
    link_demo: 'https://aditya-ai-finance.vercel.app',
    link_github: 'https://github.com/AdityaArgadinata/ai-finance-tracker',
    stacks:
      '["Next.js", "TypeScript", "TailwindCSS", "Supabase", "Telegram", "Artificial Intelligence"]',
    content: `
## Overview

Expanse is a personal money tracker built around a Telegram Bot. Instead of opening a finance app and filling forms manually, users can write natural messages such as "Bought coffee 25000" or "This month's salary 5000000". The system extracts the transaction details and stores them as structured records.

## Key Features

- **Natural Language Processing**: Uses Groq LLaMA 3.1 to classify transaction type, category, item, and amount.
- **Telegram Bot Workflow**: Uses Telegram webhook integration for quick input and instant replies.
- **Realtime Storage**: Saves transaction data to Supabase PostgreSQL.
- **Modern Web Stack**: Built with Next.js App Router, TypeScript, Tailwind CSS, and React.

## Technical Implementation

The project combines a conversational input layer with a structured backend. Telegram sends messages to a Next.js API endpoint, the AI model extracts transaction fields, and Supabase stores the normalized finance data.
    `,
    is_show: true,
    is_featured: true,
    updated_at: new Date('2026-05-25'),
  },
  {
    title: 'Netflix Clone',
    slug: 'netflix-clone',
    description:
      'A streaming movie interface inspired by Netflix, built with Next.js and Supabase integration.',
    image: '/images/placeholder.png',
    link_demo: 'https://netflix-clone-two-plum.vercel.app',
    link_github: 'https://github.com/AdityaArgadinata/netflix-clone',
    stacks: '["Next.js", "JavaScript", "TailwindCSS", "Supabase", "Vercel"]',
    content: `
## Project Overview

Netflix Clone is a movie streaming UI project focused on recreating the familiar browsing experience of a modern entertainment platform. It includes a Next.js frontend, Supabase integration, and analytics support through Umami.

## Key Features

- **Streaming-style Interface**: A familiar media browsing experience inspired by Netflix.
- **Next.js App Router**: Built on a modern Next.js application structure.
- **Supabase Integration**: Uses Supabase as part of the application backend layer.
- **Analytics Ready**: Supports Umami analytics through environment configuration.

## Architecture

The project uses Next.js for the frontend and Supabase for backend capabilities. It is deployed on Vercel and configured with environment-based analytics, making it easy to observe traffic without hardcoding tracking credentials.
    `,
    is_show: true,
    is_featured: true,
    updated_at: new Date('2026-04-21'),
  },
  {
    title: 'Stock Market Tools',
    slug: 'stock-market-tools',
    description:
      'A personal stock market toolkit for analyzing market data with charts, tables, routing, and spreadsheet export support.',
    image: '/images/placeholder.png',
    link_github: 'https://github.com/AdityaArgadinata/stock-market-tools',
    stacks: '["React.js", "TypeScript", "Vite", "TailwindCSS"]',
    content: `
## About the Project

Stock Market Tools is a personal toolkit for exploring and analyzing stock market information. It is built as a Vite + React application with TypeScript, charting, routing, and spreadsheet export utilities.

## Features

- **Market Analysis UI**: React-based interface for working with stock market data.
- **Interactive Charts**: Uses Recharts to visualize trends and metrics.
- **Spreadsheet Export**: Includes XLSX support for exporting analysis data.
- **Client-side Routing**: Uses React Router for multi-page navigation.

## Technology Stack

The project uses Vite for fast development, React 19, TypeScript, Tailwind CSS, Recharts, React Router, and XLSX. It is designed as a focused personal toolkit rather than a generic dashboard template.
    `,
    is_show: true,
    is_featured: true,
    updated_at: new Date('2026-01-17'),
  },
  {
    title: 'YouTube Analytics',
    slug: 'yt-analytics',
    description:
      'A professional analytics tool for small YouTube creators with channel insights, keyword analysis, hashtag insights, and exportable reports.',
    image: '/images/placeholder.png',
    link_demo: 'https://youtubepro-analytics.vercel.app/',
    link_github: 'https://github.com/AdityaArgadinata/yt-analytics',
    stacks: '["Next.js", "TypeScript", "TailwindCSS", "Firebase", "YouTube"]',
    content: `
## Overview

YouTube Analytics is a professional insights tool for small YouTube creators. It helps creators understand channel performance, optimize content, and discover patterns across videos, keywords, and hashtags.

## Key Features

- **Channel Analytics Dashboard**: Tracks views, subscribers, video count, and engagement metrics.
- **Video Performance Analysis**: Breaks down video performance with sorting and filtering.
- **AI-powered Keyword Analysis**: Extracts and scores useful keywords from titles and descriptions.
- **Hashtag Insights**: Identifies hashtag usage, frequency, and engagement correlation.
- **Export to Excel**: Generates downloadable reports for deeper review.

## Technical Implementation

The application is built with Next.js, TypeScript, Tailwind CSS, Firebase authentication, YouTube Data API v3, Recharts, and XLSX export support. It is designed for content creators, marketing teams, and digital agencies that need practical YouTube performance insights.
    `,
    is_show: true,
    is_featured: false,
    updated_at: new Date('2025-12-15'),
  },
  {
    title: 'Bursa Rakyat',
    slug: 'bursarakyat',
    description:
      'A professional news portal built with a headless CMS architecture using Next.js frontend and Strapi backend.',
    image: '/images/placeholder.png',
    link_github: 'https://github.com/AdityaArgadinata/bursarakyat',
    stacks: '["Next.js", "TypeScript", "Strapi", "PostgreSQL"]',
    content: `
## Overview

Bursa Rakyat is a modern professional news portal built with a headless CMS architecture. The frontend uses Next.js App Router, while the backend uses Strapi v5 as the content management system.

## Key Features

- **Headless CMS Architecture**: Separates editorial content management from the frontend experience.
- **SEO-focused News Pages**: Supports dynamic metadata, JSON-LD schemas, robots, and dynamic sitemap generation.
- **Production-ready Backend**: Strapi v5 backend designed for deployment with PostgreSQL.
- **Optimized Frontend**: Next.js frontend with image optimization and ISR-ready deployment flow.

## Technical Implementation

The repository is organized into backend and frontend folders. The backend runs Strapi v5 with database support for SQLite locally and PostgreSQL in production. The frontend consumes CMS data and renders a fast news portal with strong search engine optimization.
    `,
    is_show: true,
    is_featured: false,
    updated_at: new Date('2026-05-30'),
  },
];
