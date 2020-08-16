import React from 'react';

import { Modal, Button } from 'react-bootstrap';

import filename from '../../util/filename';

import link from '../../helper/link';

import { HistoryItem } from '../../store/queue/types';

import * as ls from '../../util/local-storage';

import BtnCopy from '../btn-copy';
import PopoverConfirm from '../popover-confirm';
import ExLink from '../ex-link';

interface Props {
  onHide: () => void
}

interface State {
  data: HistoryItem[]
}

export default class UploadHistory extends React.Component<Props, State> {
  state: State = {
    data: []
  };

  fetch = () => {
    const data: HistoryItem[] = ls.getByPrefix('history')
      .sort((a, b) => b.timestamp - a.timestamp) as HistoryItem[];

    this.setState({ data });
  };

  componentDidMount() {
    this.fetch();
  }

  clear = () => {
    ls.removeByPrefix('history');
    this.fetch();
  };

  render() {
    const { onHide } = this.props;
    const { data } = this.state;

    return <Modal show={true} size="lg" onHide={onHide} centered={true} className="upload-history-modal">
      <Modal.Header closeButton={true}>
        <Modal.Title>Upload History</Modal.Title>
        {data.length > 0 && (
          <PopoverConfirm onConfirm={this.clear}>
            <Button variant="outline-primary" size="sm">Clear History</Button>
          </PopoverConfirm>
        )}
      </Modal.Header>
      <Modal.Body>
        {(() => {
          if (data.length === 0) {
            return <span className="text-muted">History is empty.</span>;
          }

          return <>
            {data.map((item, i) => (
              <div className="item" key={i}>
                <div className="item-info">
                  <div className="filename">{filename(item.path)}</div>
                  <div className="link"><ExLink href={link(item.link)}/></div>
                </div>
                <div className="copy">
                  <BtnCopy value={link(item.link)}/>
                </div>
              </div>
            ))}
          </>;
        })()}
      </Modal.Body>
    </Modal>;
  }
}
