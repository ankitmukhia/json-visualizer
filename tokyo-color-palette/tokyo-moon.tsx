"use client";

import { tokyoMoon } from "@/constants/tokyo-moon";

export const TokyoMoon = () => {
  return (
    <div className={`flex flex-col h-dvh p-4`}>
      <div className="grid grid-cols-10 gap-2">
        <div>
          {Object.keys(tokyoMoon.background).map((color) => {
            const value = tokyoMoon.background[color];
            return (
              <div
                key={color}
                style={{
                  height: 40,
                  width: 80,
                  backgroundColor: value,
                  padding: 10,
                }}
              >
                <h1 className="text-xs">{value}</h1>
              </div>
            );
          })}
        </div>

        <div>
          {Object.keys(tokyoMoon.foreground).map((color) => {
            const value = tokyoMoon.foreground[color];
            return (
              <div
                key={color}
                style={{
                  height: 40,
                  width: 80,
                  backgroundColor: value,
                  padding: 10,
                }}
              >
                <h1 className="text-xs">{value}</h1>
              </div>
            );
          })}
        </div>

        <div>
          {Object.keys(tokyoMoon.comments).map((color) => {
            const value = tokyoMoon.comments[color];
            return (
              <div
                key={color}
                style={{
                  height: 40,
                  width: 80,
                  backgroundColor: value,
                  padding: 10,
                }}
              >
                <h1 className="text-xs">{value}</h1>
              </div>
            );
          })}
        </div>

        <div>
          {Object.keys(tokyoMoon.alerts).map((color) => {
            const value = tokyoMoon.alerts[color];
            return (
              <div
                key={color}
                style={{
                  height: 40,
                  width: 80,
                  backgroundColor: value,
                  padding: 10,
                }}
              >
                <h1 className="text-xs">{value}</h1>
              </div>
            );
          })}
        </div>

        <div>
          {Object.keys(tokyoMoon.diff).map((color) => {
            const value = tokyoMoon.diff[color];
            return (
              <div
                key={color}
                style={{
                  height: 40,
                  width: 80,
                  backgroundColor: value,
                  padding: 10,
                }}
              >
                <h1 className="text-xs">{value}</h1>
              </div>
            );
          })}
        </div>

        <div>
          {Object.keys(tokyoMoon.git).map((color) => {
            const value = tokyoMoon.git[color];
            return (
              <div
                key={color}
                style={{
                  height: 40,
                  width: 80,
                  backgroundColor: value,
                  padding: 10,
                }}
              >
                <h1 className="text-xs">{value}</h1>
              </div>
            );
          })}
        </div>

        <div>
          {Object.keys(tokyoMoon.border).map((color) => {
            const value = tokyoMoon.border[color];
            return (
              <div
                key={color}
                style={{
                  height: 40,
                  width: 80,
                  backgroundColor: value,
                  padding: 10,
                }}
              >
                <h1 className="text-xs">{value}</h1>
              </div>
            );
          })}
        </div>

        <div>
          {Object.keys(tokyoMoon.colors).map((color) => {
            const value = tokyoMoon.colors[color];
            return (
              <div
                key={color}
                style={{
                  height: 40,
                  width: 80,
                  backgroundColor: value,
                  padding: 10,
                }}
              >
                <h1 className="text-xs">{value}</h1>
              </div>
            );
          })}
        </div>

        <div>
          {Object.keys(tokyoMoon.terminal).map((color) => {
            const value = tokyoMoon.terminal[color];
            return (
              <div
                key={color}
                style={{
                  height: 40,
                  width: 80,
                  backgroundColor: value,
                  padding: 10,
                }}
              >
                <h1 className="text-xs">{value}</h1>
              </div>
            );
          })}
        </div>

        <div>
          {tokyoMoon.misc.rainbow.map((color) => (
            <div
              key={color}
              style={{
                height: 40,
                width: 80,
                backgroundColor: color,
                padding: 10,
              }}
            >
              <h1 className="text-xs">{color}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
