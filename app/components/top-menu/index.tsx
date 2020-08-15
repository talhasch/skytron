import React from 'react';

import UploadHistory from '../upload-history';

interface State {
  history: boolean
}

export default class TopMenu extends React.Component<{}, State> {
  state: State = {
    history: false
  };

  toggleHistory = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();

    const { history } = this.state;
    this.setState({ history: !history });
  };

  render() {
    const { history } = this.state;

    return <>
      <div className="top-menu">
        <a href="#" onClick={this.toggleHistory}>Upload History</a>
      </div>
      {history && <UploadHistory onHide={this.toggleHistory}/>}
    </>;
  }
};
