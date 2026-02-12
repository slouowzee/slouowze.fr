# Project Roadmap & Todo

## ✅ Completed Features
- **Architecture**: Strict separation of concerns (modules/profile, modules/content).
- **UI/UX**: 
  - GitHub-like layout (2 columns).
  - Sticky navigation tab bar.
  - Dark/Light mode toggle.
  - "Contribution Graph" visualization (mock data).
- **Content**:
  - Profile section with dynamic data.
  - Overview tab with "README", Experience, Education, and Pinned Projects.
  - Skills tab with tech icons.
  - Projects tab.
- **Features**:
  - Local view counter (localStorage simulation).
  - Responsive design.

## 🚀 Future Improvements (Todo)

### Backend & Data
- [ ] **Real View Counter**: Connect `ViewCounter` to a database (Supabase, Firebase, or CountAPI).
- [ ] **Live GitHub Data**: Fetch real contribution data from GitHub API for the graph.
- [ ] **CMS Integration**: Move `data.ts` content to a headless CMS (Sanity, Strapi) for easier updates.

### UI Enhancements
- [ ] **Project Details**: Add a drawer or modal to show more details for each project without leaving the page.
- [ ] **Command Palette**: Implement `Cmd+K` menu for quick navigation.
- [ ] **Blog Section**: Add a tab for blog posts/articles.

### Performance & SEO
- [ ] **SEO**: Add proper meta tags, OpenGraph images, and JSON-LD structured data.
- [ ] **Optimization**: Optimize images and bundle size further.
