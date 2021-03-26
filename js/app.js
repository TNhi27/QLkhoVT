
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
            <button class="btn-del" onclick="edit('${doc.id}')">Edit</button> ||
            <button class="btn-del" onclick="del('${doc.id}')">Delete</button>
           </td>  
         </tr>`;
        });
        document.getElementById("tbnVatTu").innerHTML = conten;
    });



}

const edit = (id) => {


    const TenVT = document.getElementById("TenVT");
    const Mau = document.getElementById("Mau");
    const SoLuong = document.getElementById("SoLuong");
    const DonVi = document.getElementById("DonVi");
    const NhaCC = document.getElementById("NhaCC");
    const GhiChu = document.getElementById("GhiChu");
    db.collection("VatTu").doc(id)
        .onSnapshot((doc) => {

            TenVT.value = doc.data().TenVT;
            Mau.value = doc.data().Mau;
            SoLuong.value = doc.data().SoLuong;
            DonVi.value = doc.data().DonVi;
            NhaCC.value = doc.data().NhaCC;
            GhiChu.value = doc.data().GhiChu;
        });
    $('#myTab a[href="#profile"]').tab('show') // Select tab by name

}

const del = (id) => {

    db.collection("VatTu").doc(id).delete().then(() => {
        alert("Xóa Thành Công")
        location.reload();
    })

}

const themVT = () => {


    const MaDH = document.getElementById("MaHD");
    const TenVT = document.getElementById("TenVT");
    const Mau = document.getElementById("Mau");
    const SoLuong = document.getElementById("SoLuong");
    const DonVi = document.getElementById("DonVi");
    const NhaCC = document.getElementById("NhaCC");
    const GhiChu = document.getElementById("GhiChu");
    const NgayTao = document.getElementById("NgayTao");




    if (NgayTao.value.length > 0 && MaDH.value.length > 0 && TenVT.value.length > 0 && SoLuong.value.length > 0) {
        db.collection("VatTu").get().then((snap) => {
            let kt = true;
            snap.forEach((doc) => {
                if (doc.id == TenVT.value) {
                    db.collection("VatTu").doc(doc.id).update({
                        SoLuong: Number(doc.data().SoLuong) + Number(SoLuong.value)
                    })
                    kt = false;
                }
                if (kt) {
                    db.collection("VatTu").doc(TenVT.value).set({
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
                                    SoLuong: SoLuong.value
                                })
                                kt = false;
                            }
                        })
                        if (kt) {
                            db.collection("Xuat").doc(MaDH.value).set({
                                NgayXuat: new Date(NgayTao.value).getTime()
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
                console.log(sumNhap)
            })
            //lay sl xuat
            db.collection("Xuat").where("MaVT", "==", doc.id).get().then((listXuat) => {
                listXuat.forEach((xuat) => {
                    sumXuat = sumXuat + Number(xuat.data().slXuat);
                })
                console.log(sumXuat)
            })

            conten = conten + ` <tr data-id='${doc.id}'>
           <th >${doc.id}</th>
           <td>${doc.data().TenVT}</td>
           <td>${doc.data().Mau}</td>
           <td>${doc.data().SoLuong}</td>
           <td>${doc.data().DonVi}</td>
           <td>${doc.data().NhaCC}</td>
           <td>
            <button class="btn-del" onclick="edit('${doc.id}')">Edit</button> ||
            <button class="btn-del" onclick="del('${doc.id}')">Delete</button>
           </td>  
         </tr>`;
        })
        document.getElementById("tbnVatTu").innerHTML = conten;
    })

}

const capNhatVT = () => {

    const TenVT = document.getElementById("TenVT");
    const Mau = document.getElementById("Mau");
    const SoLuong = document.getElementById("SoLuong");
    const DonVi = document.getElementById("DonVi");
    const NhaCC = document.getElementById("NhaCC");
    const GhiChu = document.getElementById("GhiChu");

    db.collection("VatTu").doc(TenVT.value).update({
        TenVT: TenVT.value,
        Mau: Mau.value,
        DonVi: DonVi.value,
        NhaCC: NhaCC.value,
        GhiChu: GhiChu.value
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

    let sum1 =0;
    let sum2 =0;

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
                console.log(doc.id)
                conten1 = conten1 + ` <tr data-id='${doc.id}'>
                <td>${index++}</td>
                <td>${doc.id}</td>
                <td>${d.getDate()}/${d.getMonth()}/${d.getFullYear()}</td>
                <td>
                 <button class="btn-del" data-toggle="modal" data-target="#modalChiTiet" onclick="chitietXuat('${doc.id}')">Chi tiet</button>
                </td>  
              </tr>`;
            })

            document.getElementById("slX").innerHTML = sum2;
            document.getElementById("tbnDonXuat").innerHTML = conten1;
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
const chitietXuat =id=>{
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


