export function extractToc(markdown = '') {
  const lines = markdown.split('\n');
  const toc: { level: 2 | 3; title: string; id: string }[] = [];

  for (const line of lines) {
    const match = line.match(/^(##|###)\s+(.*)/);
    if (!match) {
      continue;
    }

    const level = match[1] === '##' ? 2 : 3;
    const title = match[2].trim();
    const id = title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
    toc.push({ level, title, id });
  }

  return toc;
}

export function markdownToBlocks(markdown = '') {
  const lines = markdown.split('\n');
  const blocks: Array<
    | { type: 'p'; content: string }
    | { type: 'h2' | 'h3'; content: string; id: string }
    | { type: 'ul'; items: string[] }
  > = [];
  let paragraph: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length === 0) {
      return;
    }

    blocks.push({ type: 'p', content: paragraph.join(' ') });
    paragraph = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      continue;
    }

    const heading = line.match(/^(##|###)\s+(.*)/);
    if (heading) {
      flushParagraph();
      const type = heading[1] === '##' ? 'h2' : 'h3';
      const content = heading[2].trim();
      const id = content.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
      blocks.push({ type, content, id });
      continue;
    }

    if (line.startsWith('- ')) {
      flushParagraph();
      const content = line.slice(2).trim();
      const previous = blocks[blocks.length - 1];

      if (previous?.type === 'ul') {
        previous.items.push(content);
      } else {
        blocks.push({ type: 'ul', items: [content] });
      }
      continue;
    }

    paragraph.push(line);
  }

  flushParagraph();
  return blocks;
}
