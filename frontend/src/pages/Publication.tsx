import React, { useEffect, useState } from "react";

import { PageTitle, Title, Paragraph, DateFormatted } from "../components";
// import { AuthorItem } from "../components/AuthorItem/AuthorItem";
import { Publication } from "../interfaces";
import { api } from "../api";
import { Skeleton, Empty } from "antd";
import { useParams, useHistory } from "react-router-dom";

export function PublicationPage() {
  const { publicationId } = useParams();
  const history = useHistory();

  const [publication, setPublication] = useState<Publication | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPublication = async (publicationId: string) => {
      try {
        const { data } = await api.get(`/publications/${publicationId}`);
        setPublication(data);
      } catch (error) {
        console.log("Cannot get publication");
        console.log(error);
      }
      setIsLoading(false);
    };
    getPublication(publicationId);
  }, [publicationId]);

  if (isLoading) {
    return (
      <div>
        <PageTitle title="" />
        <Title size="large">
          <Skeleton
            title={false}
            paragraph={{ rows: 1, width: "80px" }}
            active
          />
        </Title>
        <div>
          <Skeleton
            title={false}
            paragraph={{ rows: 1, width: "80px" }}
            active
          />
        </div>
        <Paragraph>
          <Skeleton title={false} paragraph={{ rows: 2 }} active />
        </Paragraph>
      </div>
    );
  }

  if (!publication) {
    return (
      <div>
        <PageTitle onBack={() => history.goBack()} title="Not found" />

        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}>
          <Title size="large">Publication not found</Title>
        </Empty>
      </div>
    );
  }

  return (
    <div>
      <PageTitle
        onBack={() => history.goBack()}
        title={`${publication.title.substr(0, 30)}...`}
      />
      <Title size="large">{publication.title}</Title>
      <div>
        <DateFormatted date={publication.createdAt} />
      </div>
      {/* <AuthorItem author={author} /> */}
      <Paragraph>{publication.body}</Paragraph>
    </div>
  );
}
