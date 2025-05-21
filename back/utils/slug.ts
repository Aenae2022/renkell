import slugify from 'slugify';

export function generateSlug(name: string, id: number): string {
  const slug = slugify(name, { lower: true, strict: true });
  return `${slug}-${id}`;
}
