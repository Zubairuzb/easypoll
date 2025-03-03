const widgetOwner = "easypoll-v0.ndc-widgets.near";

const page = (props.page ?? "OFFICIAL_POLLS").toUpperCase();

const tabs = {
  OFFICIAL_POLLS: {
    text: "Official Polls by NDC",
    description:
      "Explore polls officially conducted by the NDC. These are verified, authoritative, and can provide valuable insights! Participating in the Official Polls by the NDC may eventually contribute to your on-chain reputation!",
    href: `#/${widgetOwner}/widget/EasyPoll?page=official_polls`,
    active: page === "OFFICIAL_POLLS",
  },
  PUBLIC_POLLS: {
    text: "All Public Polls",
    description:
      "Dive into the world of public opinion. These are polls created by users like you, a melting pot of diverse thoughts and perspectives!",
    href: `#/${widgetOwner}/widget/EasyPoll?page=public_polls`,
    active: page === "PUBLIC_POLLS",
  },
  MY_POLLS: {
    text: "My Polls",
    description:
      "Your personal polling station! Manage and review your own polls, watch them gain traction, and get insights from responses.",
    href: `#/${widgetOwner}/widget/EasyPoll?page=my_polls`,
    active: page === "MY_POLLS",
  },
  CREATE_POLL: {
    href: `#/${widgetOwner}/widget/EasyPoll?page=create_poll`,
    active: page === "CREATE_POLL",
    hideSidebar: true,
  },
  DELETE_POLL: {
    href: (src, blockHeight) =>
      `#/${widgetOwner}/widget/EasyPoll?page=delete_poll&src=${src}`,
    active: page === "DELETE_POLL",
    hideSidebar: true,
  },
  EDIT_POLL: {
    href: (src, blockHeight) =>
      `#/${widgetOwner}/widget/EasyPoll?page=create_poll&src=${src}`,
    active: page === "EDIT_POLL",
    hideSidebar: true,
  },
  VIEW_POLL: {
    href: (src, blockHeight) =>
      `#/${widgetOwner}/widget/EasyPoll?page=view_poll&src=${src}`,
    active: page === "VIEW_POLL",
    hideSidebar: true,
  },
  RESULTS: {
    href: (src, blockHeight) =>
      `#/${widgetOwner}/widget/EasyPoll?page=results&src=${src}`,
    active: page === "RESULTS",
    hideSidebar: true,
  },
};

const accountId = props.accountId ?? context.accountId;
const [isHuman, setIsHuman] = useState(false);

Near.asyncView("v1.nadabot.near", "is_human", { account_id: accountId }).then(
  (result) => {
    setIsHuman(result);
  }
);

const getOgToken = () => {
  const view = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
    account: `${context.accountId}`,
    issuer: "community.i-am-human.near",
  });
  return view?.[0]?.[1]?.[0];
};

const whitelist = [
  "neardigitalcollective.near",
  "blaze.near",
  "chloe.near",
  "evangel.near",
  "alejandro.near",
  "izubair.near",
  "rahulgoel.near",
  "johanga108.near",
  "escobarindo.near",
  "jarednotjerry.near",
  "yourdad.near",
];

const blackList = []; // use it to hide bad users

const indexVersion = "4.0.0";

const hasSBTToken = isHuman;

const hasOgToken = getOgToken() !== undefined;

const canOperate = hasSBTToken || whitelist.includes(context.accountId);

const SectionHeader = styled.h2`
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -1px;
`;

const SectionDescription = styled.p`
  font-size: 15px;
  font-weight: 500;
  padding-bottom: 8px;
  opacity: 0.6;
  color: "#828688";
`;

// Styles
const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  flex-direction: column;
  max-width: 100%;
  background: #fff;
  margin: auto;
  margin-bottom: 2rem;

  a {
    color: #4f46e5;
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
  @media (min-width: 900px) {
    gap: 40px;
  }
`;

const SidebarWrapper = styled.div`
  flex: 1;
  width: 100%;
  min-height: 100%;
  display: ${tabs[page].hideSidebar ? "none" : "initial"};

  @media (min-width: 768px) {
    max-width: 300px;
  }
`;
const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
  width: 100%;
  min-height: 100%;
`;

const isLoggedIn = context.accountId ? true : false;

return (
  <>
    <Widget src={`${widgetOwner}/widget/Common.OpenSansFont`} />
    <div
      style={{
        backgroundColor: "#fff",
        fontStyle: "normal",
        borderRadius: "20px",
        fontFamily: "Open Sans, sans-serif",
        margin: "auto",
      }}
    >
      <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center pb-1">
        <a
          className="d-flex align-items-center text-decoration-none"
          href={tabs.OFFICIAL_POLLS.href}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 188.35 188.35"
            height={40}
            width={40}
          >
            <rect
              width={188.35}
              height={188.35}
              rx={55.32}
              ry={55.32}
              fill="#4f46e5"
            />
            <rect
              width={19.21}
              height={24.02}
              x={55.75}
              y={103.78}
              fill="#ffd50d"
            />
            <rect
              width={19.21}
              height={43.23}
              x={84.57}
              y={84.57}
              fill="#ffd50d"
            />
            <rect
              width={19.21}
              height={67.25}
              x={113.63}
              y={60.55}
              fill="#ffd50d"
            />
          </svg>
          <h3
            style={{
              margin: "0 0.5rem",
              color: "#000",
              fontWeight: "500",
              fontSize: "28px",
              letterSpacing: "-1px",
            }}
          >
            EasyPoll
          </h3>
        </a>

        <div className="p-2 ms-auto">
          <p
            style={{
              margin: "0",
              fontWeight: "bold",
              fontSize: "15px",
              color: hasSBTToken ? "#239F28" : "#DD5E56",
            }}
          >
            {!isLoggedIn
              ? "Sign In To Use EasyPoll"
              : hasSBTToken
              ? "Verified Human"
              : "Non-Verified Human"}
          </p>
        </div>

        {isLoggedIn &&
          (hasSBTToken ? (
            !tabs.CREATE_POLL.active && (
              <a href={tabs.CREATE_POLL.href} className="text-decoration-none">
                <Widget
                  src="rubycop.near/widget/NDC.StyledComponents"
                  props={{
                    Button: {
                      text: "Create a Poll",
                      icon: <i className="bi bi-plus-lg" />,
                      onClick: handleClickFunction,
                    },
                  }}
                />
              </a>
            )
          ) : (
            <a
              href="https://app.nada.bot"
              target="_blank"
              className="text-decoration-none"
            >
              <Widget
                src="rubycop.near/widget/NDC.StyledComponents"
                props={{
                  Button: {
                    text: "Verify as Human",
                    icon: (
                      // should be replaced with I-AM-HUMAN logo svg but I couldn't find it :(
                      <img
                        height={25}
                        width={25}
                        style={{
                          filter: "brightness(100)",
                        }}
                        src="data:image/png;base64,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"
                      />
                    ),
                    className: "primary dark d-flex gap-2 align-items-center",
                    onClick: () => {},
                  },
                }}
              />
            </a>
          ))}
      </div>
      <Wrapper>
        <SidebarWrapper>
          <Widget
            src={`${widgetOwner}/widget/EasyPoll.Sidebar`}
            props={{ tabs }}
          />
        </SidebarWrapper>

        <MainWrapper className="pt-4 pb-3">
          {tabs[page].text && <SectionHeader>{tabs[page].text}</SectionHeader>}
          {tabs[page].description && (
            <SectionDescription>{tabs[page].description}</SectionDescription>
          )}
          {page === "OFFICIAL_POLLS" ? (
            <Widget
              src={`${widgetOwner}/widget/EasyPoll.Polls`}
              props={{
                indexVersion,
                filterByUser: whitelist,
                skipHumanVericationFor: whitelist,
                blackList,
                tabs,
                type: "official",
              }}
            />
          ) : page === "PUBLIC_POLLS" ? (
            <Widget
              src={`${widgetOwner}/widget/EasyPoll.Polls`}
              props={{
                indexVersion,
                skipHumanVericationFor: whitelist,
                onlyVerifiedHumans: false,
                blackList,
                tabs,
              }}
            />
          ) : page === "MY_POLLS" ? (
            <Widget
              src={`${widgetOwner}/widget/EasyPoll.MyPolls`}
              props={{
                indexVersion,
                blackList,
                tabs,
                whitelist,
                widgetOwner,
              }}
            />
          ) : page === "VIEW_POLL" ? (
            <Widget
              src={`${widgetOwner}/widget/EasyPoll.ViewPoll`}
              props={{
                shouldDisplayViewAll: false,
                tabs,
                isHuman: hasSBTToken,
                isOg: hasOgToken,
                src: props.src,
                blockHeight: props.blockHeight,
                indexVersion,
              }}
            />
          ) : page === "CREATE_POLL" ? (
            <Widget
              src={`${widgetOwner}/widget/EasyPoll.CreatePoll`}
              props={{
                indexVersion,
                blockHeight: props.blockHeight,
                src: props.src,
                whitelist,
              }}
            />
          ) : page === "RESULTS" ? (
            <Widget
              src={`${widgetOwner}/widget/EasyPoll.Results`}
              props={{
                blockHeight: props.blockHeight,
                src: props.src,
                indexVersion,
              }}
            />
          ) : page === "DELETE_POLL" ? (
            <Widget
              src={`${widgetOwner}/widget/EasyPoll.DeletePoll`}
              props={{
                blockHeight: props.blockHeight,
                src: props.src,
                tabs,
              }}
            />
          ) : (
            "404"
          )}
        </MainWrapper>
      </Wrapper>
    </div>
  </>
);