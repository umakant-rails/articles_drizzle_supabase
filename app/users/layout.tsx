import LayoutComponentComposer from './components/LayoutComponentComposer';

export default function AdminLayout({ children }: Readonly<{children: React.ReactNode;}>) {

  return (
    <>
      <div>
        <LayoutComponentComposer children={children} />
      </div>
    </>
  )
}
