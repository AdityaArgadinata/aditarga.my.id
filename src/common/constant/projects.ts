import { ProjectItemProps } from '../types/projects';

export const PROJECTS_DATA: ProjectItemProps[] = [
  {
    title: 'Personal Portfolio Website',
    slug: 'personal-portfolio',
    description:
      'A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features include dark mode, blog functionality, project showcase, and contact form.',
    image: '/images/projects/portfolio.png',
    link_demo: 'https://aditarga.my.id',
    link_github: 'https://github.com/AdityaArgadinata/aditarga.my.id',
    stacks: '["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]',
    content: `
## Overview

This portfolio website showcases my projects, skills, and experience as a software developer. Built with modern technologies and best practices, it serves as a professional platform to display my work.

## Features

- **Responsive Design**: Optimized for all device sizes
- **Dark Mode**: Toggle between light and dark themes
- **SEO Optimized**: Enhanced search engine visibility
- **Smooth Animations**: Engaging user experience with Framer Motion
- **Performance**: Fast loading times and optimized images

## Technical Implementation

The website is built using Next.js for server-side rendering and static generation, ensuring excellent performance and SEO. TypeScript provides type safety throughout the application, while Tailwind CSS enables rapid UI development with utility-first styling.
    `,
    is_show: true,
    is_featured: true,
    updated_at: new Date('2024-01-15'),
  },
  {
    title: 'E-Commerce Platform',
    slug: 'ecommerce-platform',
    description:
      'A full-stack e-commerce solution with React frontend, Node.js backend, and PostgreSQL database. Includes payment integration and admin dashboard.',
    image: '/images/placeholder.png',
    link_demo: 'https://ecommerce-demo.com',
    link_github: 'https://github.com/username/ecommerce',
    stacks: '["React", "Node.js", "PostgreSQL", "Stripe", "Express"]',
    content: `
## Project Overview

A comprehensive e-commerce platform that provides a seamless shopping experience for users and powerful management tools for administrators.

## Key Features

- **User Authentication**: Secure login and registration system
- **Product Catalog**: Advanced search and filtering capabilities
- **Shopping Cart**: Persistent cart across sessions
- **Payment Processing**: Integrated with Stripe for secure payments
- **Order Management**: Complete order tracking system
- **Admin Dashboard**: Comprehensive admin interface for product and order management

## Architecture

The platform follows a microservices architecture with separate frontend and backend applications. The React frontend communicates with the Node.js API server, which interacts with a PostgreSQL database for data persistence.
    `,
    is_show: true,
    is_featured: true,
    updated_at: new Date('2024-02-20'),
  },
  {
    title: 'Task Management App',
    slug: 'task-management-app',
    description:
      'A collaborative task management application built with Vue.js and Firebase. Features real-time updates, team collaboration, and progress tracking.',
    image: '/images/placeholder.png',
    link_demo: 'https://taskapp-demo.com',
    link_github: 'https://github.com/username/taskapp',
    stacks: '["Vue.js", "Firebase", "Vuetify", "JavaScript"]',
    content: `
## About the Project

A modern task management application designed to help teams collaborate effectively and track project progress in real-time.

## Features

- **Real-time Collaboration**: Live updates across all team members
- **Project Organization**: Organize tasks by projects and categories
- **Progress Tracking**: Visual progress indicators and completion statistics
- **Team Management**: Invite team members and assign roles
- **Notification System**: Real-time notifications for task updates
- **Mobile Responsive**: Works seamlessly on all devices

## Technology Stack

Built with Vue.js for a reactive user interface and Firebase for real-time database functionality and authentication. Vuetify provides a beautiful Material Design component library.
    `,
    is_show: true,
    is_featured: false,
    updated_at: new Date('2024-03-10'),
  },
  {
    title: 'Weather Forecast App',
    slug: 'weather-forecast-app',
    description:
      'A beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.',
    image: '/images/placeholder.png',
    link_demo: 'https://weather-demo.com',
    link_github: 'https://github.com/username/weather-app',
    stacks: '["React", "TypeScript", "OpenWeather API", "Leaflet"]',
    is_show: true,
    is_featured: false,
    updated_at: new Date('2024-01-05'),
  },
  {
    title: 'Blog Platform',
    slug: 'blog-platform',
    description:
      'A modern blogging platform with markdown support, comment system, and SEO optimization built with Next.js.',
    image: '/images/placeholder.png',
    link_demo: 'https://blog-demo.com',
    link_github: 'https://github.com/username/blog-platform',
    stacks: '["Next.js", "MDX", "Prisma", "PostgreSQL"]',
    is_show: true,
    is_featured: false,
    updated_at: new Date('2023-12-15'),
  },
  {
    title: 'Chat Application',
    slug: 'chat-application',
    description:
      'Real-time chat application with private messaging, group chats, and file sharing capabilities.',
    image: '/images/placeholder.png',
    link_demo: 'https://chat-demo.com',
    link_github: 'https://github.com/username/chat-app',
    stacks: '["React", "Socket.io", "Node.js", "MongoDB"]',
    is_show: true,
    is_featured: false,
    updated_at: new Date('2023-11-20'),
  },
];
