import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Row,
  Column,
  Text,
} from "@react-email/components";

interface AdminNotificationProps {
  name: string;
  email: string;
  mobile: string;
  note?: string;
}

export default function AdminNotification({
  name,
  email,
  mobile,
  note,
}: AdminNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>New Contact Enquiry Received</Preview>

      <Body
        style={{
          backgroundColor: "#f5f7fa",
          fontFamily: "Arial, sans-serif",
          padding: "30px 0",
        }}
      >
        <Container
          style={{
            maxWidth: "650px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            padding: "30px",
          }}
        >
          <Heading
            style={{
              color: "#0f172a",
              fontSize: "24px",
              marginBottom: "20px",
            }}
          >
            📩 New Contact Enquiry
          </Heading>

          <Text
            style={{
              color: "#475569",
              marginBottom: "20px",
            }}
          >
            A new enquiry has been submitted through the <strong>TITO</strong> website.
          </Text>

          <Section>
            <Row>
              <Column>
                <Text>
                  <strong>Name:</strong> {name}
                </Text>

                <Text>
                  <strong>Email:</strong> {email}
                </Text>

                <Text>
                  <strong>Mobile:</strong> {mobile}
                </Text>

                <Text>
                  <strong>Message:</strong>{" "}
                  {note?.trim() || "No message provided"}
                </Text>
              </Column>
            </Row>
          </Section>

          <Section
            style={{
              marginTop: "30px",
              borderTop: "1px solid #e5e7eb",
              paddingTop: "20px",
            }}
          >
            <Text
              style={{
                fontSize: "13px",
                color: "#64748b",
              }}
            >
              This email was automatically generated from the TITO  website contact form.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}