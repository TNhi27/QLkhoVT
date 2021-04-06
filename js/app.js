
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyBKCeCjR_qjNC0F4TBjgR4UoZLf8tjwvaI",
    authDomain: "khovythinh.firebaseapp.com",
    projectId: "khovythinh",
    storageBucket: "khovythinh.appspot.com",
    messagingSenderId: "715891396024",
    appId: "1:715891396024:web:6bf1cb9a056670972d134d",
    measurementId: "G-08JYQHMMF3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();




//lay tat ca vat tu len tbn
const getall = () => {

    let conten = '';
    db.collection("VatTu").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            conten = conten + ` <tr data-id='${doc.id}'>
           
           <td>${doc.data().TenVT}</td>
           <td>${doc.data().Mau}</td>
           <td>${doc.data().SoLuong}</td>
           <td>${doc.data().DonVi}</td>
           <td>${doc.data().NhaCC}</td>
           <td>
            <button class="btn-del" onclick="edit('${doc.id}')">Chỉnh sửa</button> ||           
            <button class="btn-del" data-toggle="modal" data-target="#modalXuat"   onclick="render('${doc.id}')">Xuất</button> ||
            <button class="btn-del" onclick="del('${doc.id}')">Xóa</button>
           </td>  
         </tr>`;
        });
        document.getElementById("tbnVatTu").innerHTML = conten;
    });


}


const render = (id) => {
    document.getElementById("id-vattu").value = id;
}
const addDonXuat = () => {

    let MaDX = document.getElementById("MaDX");
    let sl = document.getElementById("slXuat").value;
    let id = document.getElementById("id-vattu").value;

    db.collection("VatTu").doc(id).get().then((doc) => {

        let tenvt = "";
        if (MaDX.value.length > 0) {
            db.collection("VatTu").doc(id).get().then((doc) => {
                renderTable(MaDX.value);
                db.collection("Xuat").doc(MaDX.value).collection("dsVatTuXuat").doc(id).set({
                    MaVT: id,
                    TenVT: doc.data().TenVT,
                    Mau: doc.data().Mau,
                    SoLuong: sl
                })
            })

        } else {
            alert("Chua co Don Xuat duoc tao")
        }
    })




}
const renderTable = (MaDX) => {
    let nd = "";
    let stt = 0;
    db.collection("Xuat").doc(MaDX).collection("dsVatTuXuat")
        .get()
        .then((snap) => {
            snap.forEach((doc) => {
                stt++

                nd += `<tr>
            <td>${stt}</td>
            <td>${doc.data().MaVT}</td>
            <td>${doc.data().Mau}</td>
            <td>${doc.data().SoLuong}</td>
          </tr>`;


            })

            db.collection("Xuat").doc(MaDX).get().then((doc) => {
                document.getElementById("NgayXuat").value = new Date(doc.data().NgayXuat);
                document.getElementById("MaDX").value = MaDX;
                document.getElementById("NguoiNhan").value = doc.data().NguoiNhan;
                document.getElementById("title-tbnDonXuat").innerHTML = `Đơn Hàng Xuất : ${MaDX}`
                $('#myTab a[href="#xuatkho"]').tab('show')
            })
            document.getElementById("tbn-dsVatTuXuat").innerHTML = nd;
        })


}

const taoDonXuat = () => {
    let MaDX = document.getElementById("MaDX");
    let NgayXuat = document.getElementById("NgayXuat");

    if (MaDX.value.length > 0 && NgayXuat.value.length > 0) {
        db.collection("Xuat").doc(MaDX.value).set({
            NgayXuat: new Date(NgayXuat.value).getTime(),
            NguoiNhan: document.getElementById("NguoiNhan").value
        }).then(() => {
            document.getElementById("title-tbnDonXuat").innerHTML = `DON HANG XUAT :${MaDX.value}`
            alert("Tao Thanh Cong !")
        })
    } else {
        alert("Vui long nhap day du")
    }


}

const edit = (id) => {


    const TenVT = document.getElementById("TenVT");
    const Mau = document.getElementById("Mau");
    const MaVT = document.getElementById("MaVT");
    const SoLuong = document.getElementById("SoLuong");
    const DonVi = document.getElementById("DonVi");
    const NhaCC = document.getElementById("NhaCC");
    const GhiChu = document.getElementById("GhiChu");
    db.collection("VatTu").doc(id)
        .onSnapshot((doc) => {

            TenVT.value = doc.data().TenVT;
            MaVT.value = doc.id;
            Mau.value = doc.data().Mau;
            SoLuong.value = doc.data().SoLuong;
            DonVi.value = doc.data().DonVi;
            NhaCC.value = doc.data().NhaCC;
            GhiChu.value = doc.data().GhiChu;
        });
    $('#myTab a[href="#profile"]').tab('show') // Select tab by name

}

const del = (id) => {
    let ck = confirm("Bạn có chắt muốn xóa !");
    if (ck) {
        db.collection("VatTu").doc(id).delete().then(() => {
            alert("Xóa Thành Công")
            location.reload();
        })
    }

}

const themVT = () => {


    const MaDH = document.getElementById("MaHD");
    const MaVT = document.getElementById("MaVT");
    const TenVT = document.getElementById("TenVT");
    const Mau = document.getElementById("Mau");
    const SoLuong = document.getElementById("slNhap");
    const DonVi = document.getElementById("DonVi");
    const NhaCC = document.getElementById("NhaCC");
    const GhiChu = document.getElementById("GhiChu");
    const NgayTao = document.getElementById("NgayTao");




    if (NgayTao.value.length > 0 && MaDH.value.length > 0 && TenVT.value.length > 0 && SoLuong.value.length > 0) {
        db.collection("VatTu").get().then((snap) => {
            let kt = true;
            snap.forEach((doc) => {
                if (doc.id == MaVT.value) {
                    db.collection("VatTu").doc(doc.id).update({
                        SoLuong: Number(doc.data().SoLuong) + Number(SoLuong.value)
                    })
                    kt = false;
                }
                if (kt) {
                    db.collection("VatTu").doc(MaVT.value).set({
                        TenVT: TenVT.value,
                        Mau: Mau.value,
                        SoLuong: SoLuong.value,
                        DonVi: DonVi.value,
                        NhaCC: NhaCC.value,
                        GhiChu: GhiChu.value
                    })
                }
            })
        });

        db.collection("DonHang").get().then((snap) => {
            let kt = true;
            snap.forEach((doc) => {
                if (doc.id == MaDH.value) {
                    db.collection("DonHang").doc(doc.id).collection("dsVatTuNhap").add({
                        TenVT: TenVT.value,
                        SoLuong: SoLuong.value
                    })
                    kt = false;
                }
            })
            if (kt) {
                db.collection("DonHang").doc(MaDH.value).set({
                    NgayTao: new Date(NgayTao.value).getTime()
                })
                db.collection("DonHang").doc(MaDH.value).collection("dsVatTuNhap").add({
                    TenVT: TenVT.value,
                    SoLuong: SoLuong.value
                })
            }
        })


        alert("Nhap Thanh Cong")
    } else {
        alert("Vui lòng Điển đầy đủ")
    }
}

const Xuat = () => {
    const MaDH = document.getElementById("MaHD");
    const TenVT = document.getElementById("TenVT");
    const Mau = document.getElementById("Mau");
    const SoLuong = document.getElementById("SoLuong");
    const DonVi = document.getElementById("DonVi");
    const NhaCC = document.getElementById("NhaCC");
    const GhiChu = document.getElementById("GhiChu");
    const NgayTao = document.getElementById("NgayTao");
    const NguoiNhan = document.getElementById("NguoiNhan");




    if (NgayTao.value.length > 0 && MaDH.value.length > 0 && TenVT.value.length > 0 && SoLuong.value.length > 0) {
        db.collection("VatTu").get().then((snap) => {
            let kt = true;
            snap.forEach((doc) => {
                if (doc.id == TenVT.value) {

                    db.collection("VatTu").doc(doc.id).update({
                        SoLuong: Number(doc.data().SoLuong) - Number(SoLuong.value)
                    })

                    db.collection("Xuat").get().then((snap) => {
                        let kt = true;
                        snap.forEach((doc) => {
                            if (doc.id == MaDH.value) {
                                db.collection("Xuat").doc(doc.id).collection("dsVatTuXuat").add({
                                    TenVT: TenVT.value,
                                    Mau: Mau.value,
                                    SoLuong: SoLuong.value
                                })
                                kt = false;
                            }
                        })
                        if (kt) {
                            db.collection("Xuat").doc(MaDH.value).set({
                                NgayXuat: new Date(NgayTao.value).getTime(),
                                NguoiNhan: NguoiNhan.value
                            })
                            db.collection("Xuat").doc(MaDH.value).collection("dsVatTuXuat").add({
                                TenVT: TenVT.value,
                                SoLuong: SoLuong.value
                            })
                        }
                    })

                    kt = false;
                }

            })
            if (kt) {
                alert("Vật Tư KHÔNG Tồn Tại");
            }
        });



    } else {
        alert("Vui lòng Điển đầy đủ")
    }
}

const tim = () => {

    const tu = $("#tuNgay").val();
    const den = $("#denNgay").val();
    let conten = '';
    let key = $("#tim").val();
    db.collection("VatTu").orderBy("TenVT").startAt(key).endAt(key + "\uf8ff").get().then((snap) => {
        snap.forEach((doc) => {
            let sumNhap = 0;
            let sumXuat = 0;
            //lay sl nhap
            db.collection("Nhap").where("MaVT", "==", doc.id).get().then((listNhap) => {
                listNhap.forEach((nhap) => {
                    sumNhap = sumNhap + Number(nhap.data().slNhap);
                })
                
            })
            //lay sl xuat
            db.collection("Xuat").where("MaVT", "==", doc.id).get().then((listXuat) => {
                listXuat.forEach((xuat) => {
                    sumXuat = sumXuat + Number(xuat.data().slXuat);
                })
                
            })

            conten = conten + ` <tr data-id='${doc.id}'>
           
           <td>${doc.data().TenVT}</td>
           <td>${doc.data().Mau}</td>
           <td>${doc.data().SoLuong}</td>
           <td>${doc.data().DonVi}</td>
           <td>${doc.data().NhaCC}</td>
           <td>
             <button class="btn-del" onclick="edit('${doc.id}')">Chỉnh sửa</button> ||           
            <button class="btn-del" data-toggle="modal" data-target="#modalXuat"   onclick="render('${doc.id}')">Xuất</button> ||
            <button class="btn-del" onclick="del('${doc.id}')">Xóa</button>
           </td>  
         </tr>`;
        })
        document.getElementById("tbnVatTu").innerHTML = conten;
    })

}

const capNhatVT = () => {

    const TenVT = document.getElementById("TenVT");
    const MaVT = document.getElementById("MaVT");
    const Mau = document.getElementById("Mau");
    const SoLuong = document.getElementById("SoLuong");
    const DonVi = document.getElementById("DonVi");
    const NhaCC = document.getElementById("NhaCC");
    const GhiChu = document.getElementById("GhiChu");

    db.collection("VatTu").doc(MaVT.value).update({
        TenVT: TenVT.value,
        Mau: Mau.value,
        DonVi: DonVi.value,
        NhaCC: NhaCC.value,
        GhiChu: GhiChu.value
    }).then(() => {
        alert("Cập nhật thành công")
        location.reload()
    })
}

const show = () => {
    let tu = document.getElementById("ngay1").value;
    let ngay1 = new Date(tu).getTime();
    let den = document.getElementById("ngay2").value;
    let ngay2 = new Date(den).getTime();

    let conten = "";
    let conten1 = "";
    let index = 1;
    let index1 = 1;

    let sum1 = 0;
    let sum2 = 0;

    let list2 = [];

    db.collection("DonHang").where("NgayTao", ">=", ngay1)
        .where("NgayTao", "<=", ngay2)
        .get().then((snap) => {
            snap.forEach((doc) => {
                sum1++;
                let d = new Date(doc.data().NgayTao);

                conten = conten + ` <tr data-id='${doc.id}'>
                <td>${index++}</td>
                <td>${doc.id}</td>
                <td>${d.getDate()}/${d.getMonth()}/${d.getFullYear()}</td>
                <td>
                 <button class="btn-del" data-toggle="modal" data-target="#modalChiTiet" onclick="chitiet('${doc.id}')">Chi tiet</button>
                </td>  
              </tr>`;
            })


            document.getElementById("slN").innerHTML = `<h1>${sum1}</h1>`;
            document.getElementById("tbnDonHang").innerHTML = conten;
        })

    db.collection("Xuat").where("NgayXuat", ">=", ngay1)
        .where("NgayXuat", "<=", ngay2)
        .get().then((snap) => {
            snap.forEach((doc) => {
                sum2++;
                let d = new Date(doc.data().NgayXuat);
                
                conten1 = conten1 + ` <tr data-id='${doc.id}'>
                <td>${index1++}</td>
                <td>${doc.id}</td>
                <td>${d.getDate()}/${d.getMonth()}/${d.getFullYear()}</td>
                <td>
                 <button class="btn-del" data-toggle="modal" data-target="#modalChiTiet" onclick="chitietXuat('${doc.id}')">Chi tiet</button>
                || <button class="btn-del"  onclick="renderTable('${doc.id}')">Excel</button>
                 </td>  
              </tr>`;
            })

            document.getElementById("slX").innerHTML = sum2;
            document.getElementById("tbnDonXuat").innerHTML = conten1;
        })
}

const addWithExcel = () => {
    readXlsxFile(input.files[0]).then((data) => {
        let i = 0;
        data.map((row, index) => {
            const MaDH = row[0];
            const Mau = row[2];
            
            const TenVT = row[1];
            const MaVT = TenVT+Mau;
            const SoLuong = row[3];
            const DonVi = row[4];
            const NhaCC = row[5];
            const GhiChu = row[6];
            const NgayTao = new Date();

            


            db.collection("VatTu").get().then((snap) => {
                let kt = true;
                snap.forEach((doc) => {
                    if (doc.id == MaVT) {
                        db.collection("VatTu").doc(doc.id).update({
                            SoLuong: Number(doc.data().SoLuong) + Number(SoLuong)
                        })
                        kt = false;
                    }
                    if (kt) {
                        db.collection("VatTu").doc(MaVT).set({
                            TenVT: TenVT.length<=0?TenVT:"Null",
                            Mau: Mau.length<=0?Mau:"Null",
                            SoLuong: SoLuong.length<=0?SoLuong:"Null",
                            DonVi: DonVi.length<=0?DonVi:"Null",
                            NhaCC: NhaCC.length<=0?NhaCC:"Null",
                            GhiChu: GhiChu.length<=0?GhiChu:"Null"
                        })
                    }
                })
            });

            db.collection("DonHang").get().then((snap) => {
                let kt = true;
                snap.forEach((doc) => {
                    if (doc.id == MaDH) {
                        db.collection("DonHang").doc(doc.id).collection("dsVatTuNhap").doc(MaVT).set({
                            TenVT: TenVT,
                            Mau: Mau,
                            SoLuong: SoLuong
                        })
                        kt = false;
                    }
                })
                if (kt) {
                    db.collection("DonHang").doc(MaDH).set({
                        NgayTao: new Date().getTime()
                    })
                    db.collection("DonHang").doc(MaDH).collection("dsVatTuNhap").doc(MaVT).set({
                        TenVT: TenVT,
                        Mau: Mau,
                        SoLuong: SoLuong
                    })
                }
            })

        })
      
        alert("Thêm Thành Công")

    })
}


const excel = () => {
    let dx = document.getElementById("MaDX").value;
    let fileName = dx + new Date();
    let ws_data = [
        ["Đơn vị / Company: Chi Nhánh Công ty TNHH MTV VỸ THỊNH"],
        ["Địa chỉ / Address: 15/40/3 đường Cầu Xéo, phường Tân Quý, quận Tân Phú"],
        ["PHIẾU XUẤT KHO"],
        ["Ngày Tạo :", new Date().toString()],
        ["MÃ ĐƠN XUẤT : ", dx],
        ["Người Nhận : ", document.getElementById("NguoiNhan").value],
        ["Xuất tại kho (ngăn lô) / Delivery at : Chi Nhánh  CTY TNHH MTV VỸ THỊNH...............Cầu Xéo - Tân Quý - Tân Phú..............................."],
        [""],
        ["STT", "Tên Vật Tư", "Màu", "Số Lượng"]
    ];
    db.collection("Xuat").doc(dx).collection("dsVatTuXuat").get().then((snap1) => {
        snap1.forEach((d) => {
            let slMoi = d.data().SoLuong;
            db.collection("VatTu").doc(d.id).get().then((doc) => {
                db.collection("VatTu").doc(d.id).update({
                    SoLuong: Number(doc.data().SoLuong) - Number(slMoi)
                })
            })

        })

        let stt = 0;
        db.collection("Xuat").doc(dx).collection("dsVatTuXuat").get().then((snap2) => {
            snap2.forEach((doc) => {
                stt++;
                ws_data.push([stt, doc.data().TenVT, doc.data().Mau, doc.data().SoLuong])
            })
            ws_data.push(
                [], [],
                ["", "Người Lập Phiếu", "", "", "Người Nhận", "", "Trưởng Bộ Phận"])
        }).then(() => {
            let wb = XLSX.utils.book_new();
            wb.Props = {
                Title: fileName,
                Subject: fileName,
                Author: "Red Stapler",
                CreatedDate: new Date()
            };

            wb.SheetNames.push("Test Sheet");


            let ws = XLSX.utils.aoa_to_sheet(ws_data);
            wb.Sheets["Test Sheet"] = ws;
            let wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
            function s2ab(s) {

                let buf = new ArrayBuffer(s.length);
                let view = new Uint8Array(buf);
                for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;

            }

            saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), fileName + '.xlsx');
        })



        alert("Xuat Thanh Cong Don Hang")
    })




}

const chitiet = id => {
    let sumNhap = 0;
    let sumXuat = 0;



    let tbnCt = "";
    db.collection("DonHang").doc(id).collection("dsVatTuNhap").get().then((snap) => {
        snap.forEach((i) => {

            tbnCt = tbnCt + ` <tr data-id='${i.id}'>
            <td>${i.data().TenVT}</td>
            <td>${i.data().SoLuong}</td>  
           
          </tr>`;
        })
        document.getElementById("tbnChitiet").innerHTML = tbnCt;
    })
}
const chitietXuat = id => {
    let tbnCt = "";
    db.collection("Xuat").doc(id).collection("dsVatTuXuat").get().then((snap) => {
        snap.forEach((i) => {

            tbnCt = tbnCt + ` <tr data-id='${i.id}'>
            <td>${i.data().TenVT}</td>
            <td>${i.data().SoLuong}</td>  
           
          </tr>`;
        })
        document.getElementById("tbnChitiet").innerHTML = tbnCt;
    })
}

const lamMoi = () => {
    const MaDH = document.getElementById("MaHD");
    document.getElementById("MaVT").value = "";
    document.getElementById("TenVT").value="";
    document.getElementById("Mau").value="";
    document.getElementById("slNhap").value="";
    document.getElementById("DonVi").value="";
    document.getElementById("NhaCC").value="";
    document.getElementById("GhiChu").value="";
    document.getElementById("NgayTao").value="";
}

