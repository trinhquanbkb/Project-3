interface DataUser {
    stt: number;
    code: string;
    fullname: string;
    phone: number;
    email: string;
    role: string;
}

const dataUser: DataUser[] = [
    {
        stt: 1,
        code: "DPUS21062300087",
        fullname: "Nguyễn Thanh Tuyền",
        phone: 12345678,
        email: "thanhtuyen@dpcargo.vvn",
        role: "Quản trị viên",
    },
    {
        stt: 2,
        code: "DPUS21062300087",
        fullname: "Nguyễn Thanh Tuyền",
        phone: 12345678,
        email: "thanhtuyen@dpcargo.vvn",
        role: "Quản trị viên",
    },
];

export { dataUser };