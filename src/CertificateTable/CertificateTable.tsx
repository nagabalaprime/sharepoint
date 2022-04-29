import { Certificate } from "crypto";
import React from "react";
import   { DetailsHeader, DetailsList, IColumn, IDetailsHeaderProps, IDetailsList, IGroup, IRenderFunction, IToggleStyles, mergeStyles, Toggle, DefaultButton, IButtonStyles, initializeIcons } from "@fluentui/react";;

// Initialize icons in case this example uses them
initializeIcons();

const margin = '0 20px 20px 0';
const controlWrapperClass = mergeStyles({
  display: 'flex',
  flexWrap: 'wrap',
});
const toggleStyles: Partial<IToggleStyles> = {
  root: { margin: margin },
  label: { marginLeft: 10 },
};
const addItemButtonStyles: Partial<IButtonStyles> = { root: { margin: margin } };

interface IDetailsListGroupedExampleItem {
  key: string;
  name: string;
  color: string;
}

interface IDetailsListGroupedExampleState {
  items: IDetailsListGroupedExampleItem[];
  groups: IGroup[];
  showItemIndexInView: boolean;
  isCompactMode: boolean;
}
const _blueGroupIndex = 2;

class CertificateTable extends React.Component<{}, any> {
  private _root = React.createRef<IDetailsList>();
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    this.state = {
      items: [
        { key: 'test1', name: 'test1', email: 'test@gmail.com'  , button: onclick =()=>{}},
        { key: 'test2', name: 'test2', email: 'test@gmail.com' },
        { key: 'test3', name: 'test3', email: 'test@hotmail.com' },
        { key: 'test4', name: 'test4', email: 'test@hotmail.com' },
        { key: 'test5', name: 'test5', email: 'test@hotmail.com' },
      ],
      // This is based on the definition of items
      groups: [
        { key: 'groups', name: 'groups', startIndex: 0, count: 2, level: 0 },
        { key: 'users', name: 'user', startIndex: 2, count: 3, level: 0 },
      ],
      showItemIndexInView: false,
      isCompactMode: false,
    };

    this._columns = [
      { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'Active', name: 'email', fieldName: 'email', minWidth: 100, maxWidth: 200 },
      { key: 'button', name: 'Action', fieldName: 'button', minWidth: 100, maxWidth: 200 ,
      onRender: (item) => (
        <DefaultButton onClick={()=>console.log('item ' , item)} text="Delete" />
      ),
    }, 
    ];
  }

  public componentWillUnmount() {
    if (this.state.showItemIndexInView) {
      const itemIndexInView = this._root.current!.getStartItemIndexInView();
      alert('first item index that was in view: ' + itemIndexInView);
    }
  }



  public render() {
    const { items, groups, isCompactMode } = this.state;

    return (
      <div>
        <div className={controlWrapperClass}>
          <DefaultButton onClick={this._addItem} text="Add an item" styles={addItemButtonStyles} />
   
        </div>
        <DetailsList
          componentRef={this._root}
          items={items}
          groups={groups}
          columns={this._columns}
          ariaLabelForSelectAllCheckbox="Toggle selection for all items"
          ariaLabelForSelectionColumn="Toggle selection"
          checkButtonAriaLabel="select row"
          checkButtonGroupAriaLabel="select section"
          groupProps={{
            showEmptyGroups: true,
          }}
          compact={isCompactMode}
        />
      </div>
    );
  }

  private _addItem = (): void => {
    const items = this.state.items;
    const groups = [...this.state.groups];
    groups[_blueGroupIndex].count++;

    this.setState(
      {
        items: items.concat([
          {
            key: 'item-' + items.length,
            name: 'New item ' + items.length,
            color: 'blue',
          },
        ]),
        groups,
      },
      () => {
        if (this._root.current) {
          this._root.current.focusIndex(items.length, true);
        }
      },
    );
  };

 

}

export default CertificateTable;