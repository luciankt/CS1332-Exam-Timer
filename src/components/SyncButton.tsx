import React, { useState } from 'react';

interface SyncButtonProps {
    onSync: (status: boolean) => void;
    syncInProgress: boolean;
}

const SyncButton: React.FC<SyncButtonProps> = ({ onSync, syncInProgress }) => {
    const [isSyncing, setIsSyncing] = useState(syncInProgress);

    function clickSync() {
        if (isSyncing) {
            return;
        }
        setIsSyncing(true);
        onSync(true);
    }

    return (
        <button className={`sync-button${syncInProgress ? '' : ' pressable'}`} disabled={isSyncing} onMouseDown={clickSync}>{isSyncing ? 'SYNCING...' : 'SYNC CHANGES'}</button>
    );
};

export default SyncButton;