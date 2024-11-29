import { makeAutoObservable } from "mobx";
import { ITreeData } from "./types.ts";

class FakeTree {
  treeData: ITreeData[] | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  getMockTreeData = (data: ITreeData[]) => {
    this.treeData = data;
    this.setInitialValue(data);
  };

  private expandRow(item: ITreeData, isExpanded = true) {
    if (item.children?.length) {
      item.isExpanded = isExpanded;
    }
  }

  private incrementLevel(item: ITreeData, level = 0) {
    item.level = level + 1;
  }

  private setInitialCheckedStatus(item: ITreeData) {
    item.isChecked = false;
  }

  setInitialValue(items: ITreeData[]) {
    items.forEach((item) => {
      this.expandRow(item);
      this.setInitialCheckedStatus(item);
      this.incrementLevel(item);

      if (item.children?.length) {
        this.setInitialValue(item.children);
      }
    });
  }

  toggleExpand = (item: ITreeData, nodes = this.treeData) => {
    for (const node of nodes ?? []) {
      if (node.id === item.id) {
        node.isExpanded = !node.isExpanded;
        return;
      }
      if (node.children?.length) {
        this.toggleExpand(item, node.children);
      }
    }
  };

  setStatusForParent = (items: ITreeData[]) => {
    let parentChecked = true;

    for (const item of items) {
      if (item.children?.length) {
        item.isChecked = this.setStatusForParent(item.children);
      }

      if (!item.isChecked) {
        parentChecked = false;
      }
    }

    return parentChecked;
  };

  private setStatus = (item: ITreeData, neededStatus: boolean) => {
    item.isChecked = neededStatus;

    if (item.children?.length) {
      for (const child of item.children) {
        this.setStatus(child, neededStatus);
      }
    }
  };

  changeStatus = (item: ITreeData) => {
    const neededStatus = !item.isChecked;

    this.setStatus(item, neededStatus);
    this.setStatusForParent(this.treeData ?? []);
  };
}

export const treeDataStore = new FakeTree();
