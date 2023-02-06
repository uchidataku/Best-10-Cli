import React from "react";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Meta } from "antd/lib/list/Item";
import { Card } from "antd";
import Item from "../../../models/Item";
import styles from "./style.module.scss";

type ItemDetailCardProps = {
  item: Item;
  closeCard: () => void;
};

const ItemDetailCard = ({ item, closeCard }: ItemDetailCardProps) => {
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
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta title={item.name} description="This is the description" />
        </Card>
      </div>
      <div className={styles.backDrop} onClick={() => closeCard()}></div>
    </React.Fragment>
  );
};

export default ItemDetailCard;
