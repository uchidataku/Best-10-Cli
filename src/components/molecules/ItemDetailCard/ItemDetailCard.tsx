import React, { useMemo, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Meta } from "antd/lib/list/Item";
import { Button, Card, Input, notification } from "antd";
import Item from "../../../models/Item";
import styles from "./style.module.scss";
import { Modal } from "antd-mobile";
import { useMutation } from "react-query";
import axios from "../../../config/axios";
import Api from "../../../config/qpi";
import { useAuth } from "../../../hooks/useAuth";

type ItemDetailCardProps = {
  item: Item;
  closeCard: () => void;
  refetchItems: () => void;
};

const ItemDetailCard = ({ item, closeCard, refetchItems }: ItemDetailCardProps) => {
  const { currentAccount } = useAuth();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(item.name);

  const { mutate: onDeleteItem } = useMutation(
    () => axios.delete(Api.deleteItem.buildPath(item.id)),
    {
      onSuccess: () => {
        setOpenDeleteModal(false);
        refetchItems();
        notification.success({ message: "削除しました" });
      },
      onError: () => {
        notification.error({ message: "削除に失敗しました" });
      },
    }
  );
  const itemActions = useMemo(() => {
    return currentAccount
      ? [
          <EditOutlined key="edit" onClick={() => setEditMode(true)} />,
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
        ]
      : [];
  }, [currentAccount, item.viewerCanDelete]);

  const { mutate: onUpdateItem } = useMutation(
    () => axios.patch(Api.updateItem.buildPath(item.id), { item: { name: name } }),
    {
      onSuccess: () => {
        setName("");
        closeCard();
        refetchItems();
        notification.success({ message: "更新しました" });
      },
      onError: () => {
        notification.error({ message: "更新に失敗しました" });
      },
    }
  );

  return (
    <React.Fragment>
      {editMode ? (
        <div className={styles.editItemCard}>
          <div className={styles.cardTitle}>
            <h3>編集する</h3>
          </div>
          <div className={styles.form}>
            <div className={styles.name}>
              <p className={styles.nameLabel}>項目名</p>
              <Input
                size="large"
                className={styles.nameInput}
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
              />
            </div>
            <Button disabled={!name} className={styles.updateButton} onClick={() => onUpdateItem()}>
              更新する
            </Button>
            <Button className={styles.cancelButton} onClick={() => closeCard()}>
              キャンセル
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.itemDetailCard}>
          <Card
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              />
            }
            actions={itemActions}
          >
            <Meta title={item.name} description="This is the description" />
          </Card>
        </div>
      )}
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
