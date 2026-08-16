export function stayInBorder(x:number, y:number, width : number, height : number, boardWidth : number, boardHeight : number){

    const maxX = Math.max(0, boardWidth - width - 6);
  const maxY = Math.max(0, boardHeight - height - 6);

  return {
    x: Math.min(Math.max(0, x), maxX),
    y: Math.min(Math.max(0, y), maxY),
  };
}