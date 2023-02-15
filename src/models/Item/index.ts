interface Item {
  id: string;
  name: string;
  likesCount: number;
  isLiked: boolean;
  viewerCanUpdate: boolean;
  viewerCanDelete: boolean;
}

export default Item;
