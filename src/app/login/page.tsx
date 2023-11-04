"use client";
import { LoginProviderEnum } from "klabban-commerce";
import { useLogin, useViewer } from "klabban-commerce/react";
import { LoginWithPasswordDocument } from "klabban-commerce";

export default function Page() {
  const [{ data }, login] = useLogin();
  const [{ data: viewer }, refresh] = useViewer({
    requestPolicy: "network-only",
    pause: true,
  });
  return (
    <div>
      <p>result:</p>
      <div>{JSON.stringify(data)}</div>
      <div>user data:</div>
      <div>{JSON.stringify(viewer)}</div>
      <button
        className="p-3 bg-secondary border rounded-md shadow-sm"
        type="button"
        onClick={async (e) => {
          e.preventDefault();
          alert("start login");
          const { data, error } = await login(
            {
              input: {
                credentials: {
                  username: "adisakchaiyakul@gmail.com",
                  password: "Test@1234",
                },
                provider: LoginProviderEnum.Password,
              },
            },
            {
              fetch,
              fetchOptions: {
                credentials: "include",
                mode: "cors",
              },
            }
          );
          // const { data, error } = await login({
          //   input: {
          //     provider: LoginProviderEnum.Sitetoken,
          //     identity: "adisak",
          //   },
          // });
          if (!error && data?.login?.authToken) {
            alert("get viwer");
            refresh({
              fetchOptions: {
                headers: {
                  Authorization: `Bearer ${data?.login?.authToken}`,
                },
                cache: "no-cache",
              },
            });
          }
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          try {
            refresh({
              fetchOptions: {
                headers: {
                  Authorization: `Bearer ${data?.login?.authToken}`,
                },
                cache: "no-cache",
              },
            });
          } catch (error) {
            console.log("error", error);
          }
        }}
      >
        Refresh viewer
      </button>
      <button
        onClick={async () => {
          const { data } = await login(
            {
              input: {
                provider: LoginProviderEnum.Sitetoken,
                identity: "adisakchaiyakul@gmail.com",
              },
            },
            {
              fetchOptions() {
                return {
                  headers: {
                    "X-SITE-SECRET": "adisakchaiyakul",
                  },
                  credentials: "include",
                  // cache: "no-store",

                  // referrer: "http://klabban-demo.local",
                  referrerPolicy: "origin",
                  // mode: "cors",
                };
              },
              fetch,
            }
          );
          refresh({
            fetchOptions: {
              headers: {
                Authorization: `Bearer ${data?.login?.authToken}`,
              },
              cache: "no-cache",
            },
          });
        }}
      >
        get viwer with site token
      </button>
    </div>
  );
}
