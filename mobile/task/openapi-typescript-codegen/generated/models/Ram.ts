/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Ram = {
    active?: number;
    activeAnon?: number;
    activeFile?: number;
    anonPages?: number;
    availableMemory?: number;
    bounce?: number;
    buffers?: number;
    cached?: number;
    cmaFree?: number;
    cmaTotal?: number;
    commitLimit?: number;
    committedAS?: number;
    dirty?: number;
    freeMemory?: number;
    inactive?: number;
    inactiveAnon?: number;
    inactiveFile?: number;
    kernelStack?: number;
    kreclaimable?: number;
    mapped?: number;
    mlocked?: number;
    nfsUnstable?: number;
    pageTables?: number;
    shmem?: number;
    slab?: number;
    sreclaimable?: number;
    sunreclaim?: number;
    swapCached?: number;
    swapFree?: number;
    swapTotal?: number;
    totalMemory?: number;
    unevictable?: number;
    vmallocChunk?: number;
    vmallocTotal?: number;
    vmallocUsed?: number;
    writeback?: number;
    writebackTmp?: number;
};
