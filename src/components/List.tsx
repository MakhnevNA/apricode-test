import { observer } from "mobx-react-lite";
import { ITreeData } from "../modules/fakeTree/types.ts";

interface IListProps {
  items: ITreeData[];
  changeStatus: (item: ITreeData) => void;
  toggleExpand: (item: ITreeData, items: ITreeData[]) => void;
  styleProp?: React.CSSProperties;
}

export const List = observer(
  ({ items, styleProp, changeStatus, toggleExpand }: IListProps) => {
    return (
      <ul style={styleProp} className="flex flex-col gap-2">
        {items.map((item) => {
          return (
            <li key={item.id} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  className="size-4"
                  onChange={() => changeStatus(item)}
                />
                {item.children?.length ? (
                  <button
                    type="button"
                    className="w-2"
                    onClick={() => toggleExpand(item, items)}
                  >
                    {item.isExpanded ? "-" : "+"}
                  </button>
                ) : (
                  <></>
                )}
                <span>{item.title}</span>
              </div>
              {item.children?.length && item.isExpanded ? (
                <List
                  items={item.children}
                  changeStatus={changeStatus}
                  toggleExpand={toggleExpand}
                  styleProp={{
                    marginLeft: `${((item.level || 0) + 1) * 20}px`,
                  }}
                />
              ) : (
                <></>
              )}
            </li>
          );
        })}
      </ul>
    );
  },
);
