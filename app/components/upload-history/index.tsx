import React from 'react';

import { Modal } from 'react-bootstrap';

import filename from '../../util/filename';
import link from '../../helper/link';

import { HistoryItem } from '../../store/queue/types';

import * as ls from '../../util/local-storage';
import BtnCopy from '../btn-copy';

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

  componentDidMount() {
    const data: HistoryItem[] = ls.getByPrefix('history')
      .sort((a, b) => b.timestamp - a.timestamp) as HistoryItem[];

    this.setState({ data });
  }

  render() {
    const { onHide } = this.props;
    const { data } = this.state;

    console.log(data);

    return <Modal show={true} size="lg" onHide={onHide} centered={true} className="upload-history-modal">
      <Modal.Header closeButton={true}>
        <Modal.Title>Upload History</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {(() => {
          if (data.length === 0) {
            return <span className="text-muted">History is empty.</span>;
          }

          return data.map(i => (
            <div className="item">
              <div className="item-info">
                <div className="filename">{filename(i.path)}</div>
                <div className="link"><a href={link(i.link)}>{link(i.link)}</a></div>
              </div>
              <div className="copy">
                <BtnCopy value={link(i.link)}/>
              </div>
            </div>
          ));

        })()}
      </Modal.Body>
    </Modal>;
  }
}
