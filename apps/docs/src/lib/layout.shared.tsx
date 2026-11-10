import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'Hashti Design System',
    },
    links: [
      { text: 'Documentation', url: '/docs' },
      { text: 'Components', url: '/docs/components' },
      { text: 'Brandbook', url: '/hashti-brandbook.html' },
      { text: 'GitHub', url: 'https://github.com/raminrez/cinder' },
    ],
  };
}
