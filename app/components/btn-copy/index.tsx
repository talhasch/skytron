import React from 'react';

import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

import clipboard from '../../util/clipboard';

import { copySvg } from '../../svg';

interface Props {
  value: string;
  children?: JSX.Element
}

interface State {
  showTooltip: boolean
}

export default class BtnCopy extends React.Component<Props, State> {
  state: State = {
    showTooltip: false
  };

  clicked = (e: React.MouseEvent) => {
    e.preventDefault();

    const { value } = this.props;

    clipboard(value);

    this.setState({ showTooltip: true });

    setTimeout(() => {
      this.setState({ showTooltip: false });
    }, 1000);
  };

  render() {
    const { children } = this.props;
    const { showTooltip } = this.state;

    let child: JSX.Element;

    if (children) {
      child = React.cloneElement(children, {
        onClick: this.clicked
      });
    } else {
      child = <Button title="Copy address" onClick={this.clicked}>{copySvg}</Button>;
    }


    return <OverlayTrigger
      placement="top"
      trigger={[]}
      show={showTooltip}
      overlay={
        <Tooltip id="copy-tooltip">Copied</Tooltip>
      }
    >{child}</OverlayTrigger>;
  }
}
