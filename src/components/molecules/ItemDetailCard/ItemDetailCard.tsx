import React, { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Meta } from "antd/lib/list/Item";
import { Card, notification } from "antd";
import Item from "../../../models/Item";
import styles from "./style.module.scss";
import { Modal } from "antd-mobile";
import { useMutation } from "react-query";
import axios from "../../../config/axios";
import Api from "../../../config/qpi";

type ItemDetailCardProps = {
  item: Item;
  closeCard: () => void;
};

const ItemDetailCard = ({ item, closeCard }: ItemDetailCardProps) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { mutate: onDeleteItem } = useMutation(
    () => axios.delete(Api.deleteItem.buildPath(item.id)),
    {
      onSuccess: () => {
        notification.success({ message: "削除しました" });
      },
      onError: () => {
        notification.error({ message: "削除に失敗しました" });
      },
    }
  );

  return (
    <React.Fragment>
      <div className={styles.itemDetailCard}>
        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            // <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <DeleteOutlined
              key="delete"
              onClick={() =>
                item.viewerCanDelete
                  ? setOpenDeleteModal(true)
                  : notification.error({
                      message: "削除する権限がありません",
                    })
              }
            />,
          ]}
        >
          <Meta title={item.name} description="This is the description" />
        </Card>
      </div>
      <div className={styles.backDrop} onClick={() => closeCard()}></div>
      <Modal
        content="本当に削除しますか?"
        visible={openDeleteModal}
        closeOnAction
        showCloseButton
        onClose={() => setOpenDeleteModal(false)}
        actions={[
          { key: "confirm", text: "削除する", danger: true, onClick: () => onDeleteItem() },
          { key: "cancel", text: "キャンセル" },
        ]}
      />
    </React.Fragment>
  );
};

export default ItemDetailCard;
