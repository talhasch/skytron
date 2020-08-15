import React from 'react';

import { Button } from 'react-bootstrap';

import _c from '../../util/fix-class-names';

import resolveDataTransfer from '../../util/data-transfer-resolver';

interface Props {
  disabled?: boolean;
  onDrop: (files: File[]) => void;
}

export default class Uploader extends React.Component<Props> {
  componentDidMount(): void {
    const zone: HTMLDivElement | null = document.querySelector('.drop-zone');
    if (zone) {
      zone.addEventListener('dragover', this.onDragOver, false);
    }

    const handler: HTMLDivElement | null = document.querySelector('.drag-handler');
    if (handler) {
      handler.addEventListener('dragleave', this.onDragLeave, false);
      handler.addEventListener('drop', this.onDrop, false);
    }
  }

  componentWillUnmount(): void {
    const zone: HTMLDivElement | null = document.querySelector('.drop-zone');
    if (zone) {
      zone.removeEventListener('dragover', this.onDragOver);
    }

    const handler: HTMLDivElement | null = document.querySelector('.drag-handler');
    if (handler) {
      handler.removeEventListener('dragleave', this.onDragLeave);
      handler.removeEventListener('drop', this.onDrop);
    }
  }

  highlight = (): void => {
    const el: HTMLDivElement | null = document.querySelector('.drop-zone');
    if (el) {
      el.classList.add('highlighted');
    }
  };

  unHighlight = (): void => {
    const el: HTMLDivElement | null = document.querySelector('.drop-zone');
    if (el) {
      el.classList.remove('highlighted');
    }
  };

  onDragOver = (event: DragEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'copy';
      event.dataTransfer.dropEffect = 'copy';
    }

    this.highlight();
  };

  onDragLeave = (): void => {
    this.unHighlight();
  };

  onDrop = (event: DragEvent): void => {
    this.unHighlight();

    event.preventDefault();
    event.stopPropagation();

    if (!event.dataTransfer) {
      return;
    }

    resolveDataTransfer(event.dataTransfer).then(files => {
      const { onDrop } = this.props;
      onDrop(files);
    });
  };

  fileInputChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files.length > 0) {
      const files = [...event.target.files];
      const { onDrop } = this.props;
      onDrop(files);
    }
  };

  clicked = () => {
    const el: HTMLInputElement | null = document.querySelector('#file-input');
    if (el) {
      el.click();
    }
  };

  render() {
    const { disabled } = this.props;
    return <div className={_c(`drop-zone ${disabled ? 'disabled' : ''}`)}>
      <div className="drag-handler"/>
      <div className="zone-text">
        <h2>Upload your Files</h2>
        <p>Drop your files here to pin to Skynet</p>
        <Button onClick={this.clicked}>Browse</Button>
        <input type="file" id="file-input" multiple={true} onChange={this.fileInputChanged}/>
      </div>
    </div>;
  }
}
