import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { List } from "./components/List.tsx";
import { mockTreeData } from "./mock/mockTreeData.ts";
import { treeDataStore } from "./modules/fakeTree/fakeTree.store.ts";

const App = observer(() => {
  const { treeData, changeStatus, toggleExpand, getMockTreeData } =
    treeDataStore;

  useEffect(() => {
    getMockTreeData(mockTreeData);
  }, [getMockTreeData]);

  return (
    <div className="mt-20 flex justify-center">
      <div className="w-[50rem]">
        {treeData ? (
          <List
            items={treeData}
            changeStatus={changeStatus}
            toggleExpand={toggleExpand}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
});

export default App;
