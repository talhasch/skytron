import React from 'react';

import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

import clipboard from '../../util/clipboard';

import { copySvg } from '../../svg';

interface Props {
  value: string
}

interface State {
  showTooltip: boolean
}

export default class BtnCopy extends React.Component<Props, State> {
  state: State = {
    showTooltip: false
  };

  render() {
    const { value } = this.props;
    const { showTooltip } = this.state;

    return <OverlayTrigger
      placement="top"
      trigger={[]}
      show={showTooltip}
      overlay={
        <Tooltip id="copy-tooltip">Copied</Tooltip>
      }
    ><Button title="Copy address" onClick={() => {
      clipboard(value);
      this.setState({ showTooltip: true });
      setTimeout(() => {
        this.setState({ showTooltip: false });
      }, 1000);
    }}>{copySvg}</Button></OverlayTrigger>;
  }
}
