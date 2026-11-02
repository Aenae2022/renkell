const assets = import.meta.glob(
  "/src/assets/pictures/**/*.{png,jpg,jpeg,jfif,webp,gif,svg,PNG}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

export function getAssetUrl(path: string): string {
  return assets[`/src/assets/${path}`] as string;
}