import dayjs from 'dayjs';
export const useGenerators = () => {

    const generateUUID4 = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

    }

    const getCurretTimestampCart = () => {
        return dayjs().format('DD/MM/YYYY HH:mm:ss');
    }


    return {
        generateUUID4,
        getCurretTimestampCart
    }

}