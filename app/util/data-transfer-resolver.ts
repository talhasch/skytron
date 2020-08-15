export default async (dataTransfer: DataTransfer): Promise<File[]> => {
  const readEntries = (dir: DirectoryEntry): Promise<Entry[]> => {
    return new Promise((resolve, reject) => {
      const dirReader = dir.createReader();
      dirReader.readEntries((entries: Entry[]) => {
        resolve(entries);
      }, (err: any) => {
        // message.error(`Cannot read directory ${dir.fullPath}`);
        reject(err);
      });
    });
  };

  const fileFromEntry = (entry: FileEntry): Promise<File> => {
    return new Promise((resolve, reject) => {
      entry.file((file) => {
        resolve(file);
      }, (err) => {
        // message.error(`Cannot read file ${file.fullPath}`);
        reject(err);
      });
    });
  };

  const entryList: FileEntry[] = [];

  const scan = async (item: Entry, path = '') => {
    if (item.isFile) {
      entryList.push(item as FileEntry);
    } else if (item.isDirectory) {
      // Get folder contents
      let entries: Entry[] = [];
      try {
        entries = await readEntries(item as DirectoryEntry);
      } catch (e) {
      }

      for (let i = 0; i < entries.length; i++) {
        await scan(entries[i], path + item.name + '/');
      }
    }
  };

  const entries = [];

  for (let i = 0; i < dataTransfer.items.length; i++) {
    const item = dataTransfer.items[i];
    entries.push(item.webkitGetAsEntry());
  }

  for (let i = 0; i < entries.length; i++) {
    await scan(entries[i]);
  }

  const fileList: File[] = [];

  for (let i = 0; i < entryList.length; i++) {
    let file: File | null = null;
    try {
      file = await fileFromEntry(entryList[i]);
    } catch (e) {
    }

    if (file) fileList.push(file);
  }

  return new Promise((resolve) => {
    resolve(fileList);
  });
};
